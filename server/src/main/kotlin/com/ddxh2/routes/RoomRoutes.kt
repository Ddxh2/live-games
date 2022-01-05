package com.ddxh2.routes

import com.ddxh2.controller.RoomController
import com.ddxh2.controller.UserController
import com.ddxh2.data.room.Room
import com.ddxh2.data.user.User
import com.ddxh2.exceptions.AlreadyInRoomException
import com.ddxh2.exceptions.RoomDoesNotExistException
import com.ddxh2.handler.roomSocketMessageHandler
import com.ddxh2.session.RoomSession
import com.ddxh2.session.UserSession
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.http.cio.websocket.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*
import io.ktor.websocket.*
import kotlinx.coroutines.channels.consumeEach
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

fun Route.openRoom(roomController: RoomController) {
    post("/openRoom") {
        val roomCreds: List<String> = roomController.openRoom()
        call.respond(HttpStatusCode.OK, Json.encodeToString((roomCreds)))
    }
}

fun Route.joinRoom(userController: UserController, roomController: RoomController) {
    patch("/joinRoom") {
        val userSession = call.sessions.get<UserSession>()
        val roomSession = call.sessions.get<RoomSession>()

        val roomId: String? = roomSession?.roomId
        val roomKey = call.receive<String>()


        var responseCode: HttpStatusCode = HttpStatusCode.BadRequest
        var responseMessage: String


        if (userSession == null) {
            responseMessage = "Not Logged In"
        } else if (roomId == null) {
            responseMessage = "No Room Id Was Provided"
        } else if (roomSession == null || roomSession.roomId != roomId || roomKey == null) {
            println("Checking if session null")
            println(roomSession == null)
            responseMessage = "Failed to Join Room with ID: $roomId"
        } else {
            val user: User? = userController.getUserByUsername(userSession.username)
            val room: Room? = roomController.getRoomById(roomId)
            if (room == null) {
                responseMessage = "Room Does not Exist"
            } else if (user == null) {
                responseMessage = "User Does Not Exist"
            } else {
                roomController.joinRoom(roomId, roomKey, user)
                responseCode = HttpStatusCode.OK
                responseMessage = "Welcome to Room $roomId, ${userSession.username}!"
            }
        }
        println(responseCode)
        println(responseMessage)
        call.respond(responseCode, responseMessage)
    }
}

fun Route.enterRoom(userController: UserController, roomController: RoomController) {
    webSocket("/room/{roomId}") {
        val userSession = call.sessions.get<UserSession>()
        val roomSession = call.sessions.get<RoomSession>()

        suspend fun closeRoom(closeReason: CloseReason.Codes, closeMessage: String) {
            println(closeMessage)
            close(CloseReason(closeReason, closeMessage))
        }

        val closeReason: CloseReason.Codes = CloseReason.Codes.VIOLATED_POLICY
        val closeMessage: String

        if (userSession == null) {
            closeMessage = "User Session Not Found"
            closeRoom(closeReason, closeMessage)
            return@webSocket
        } else if (roomSession == null) {
            closeMessage = "Room Session Not Found"
            closeRoom(closeReason, closeMessage)
            return@webSocket
        }

        val user: User? = userController.getUserByUsername(userSession.username)
        val room: Room? = roomController.getRoomById(roomSession.roomId)

        if (user == null) {
            closeMessage = "User Does Not Exist"
            closeRoom(closeReason, closeMessage)
            return@webSocket
        } else if (room == null) {
            closeMessage = "Room Does Not Exist"
            closeRoom(closeReason, closeMessage)
            return@webSocket
        }

        try {
            userController.addSocket(user.username, this)

            roomController.sendMessage(room.roomId, "Hello")

            incoming.consumeEach { frame ->
                println(frame)
                roomSocketMessageHandler(room, frame)
//                if (frame is Frame.Text) {
//                    println(frame.readText())
//                    roomController.sendMessage(room.roomId, "Received your message ${frame.readText()}")
//                }
            }
        } catch (e: AlreadyInRoomException) {
            call.respond(HttpStatusCode.BadRequest, e.message ?: "")
        } catch (e: RoomDoesNotExistException) {
            call.respond(HttpStatusCode.BadRequest, e.message ?: "")
        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
            // Disconnect
            userController.removeSocket(user.username)
            println("Disconnect")
        }
    }
}

fun Route.leaveRoom(userController: UserController, roomController: RoomController) {
    delete("/leaveRoom") {
        val userSession = call.sessions.get<UserSession>()
        val roomSession = call.sessions.get<RoomSession>()

        var responseCode: HttpStatusCode = HttpStatusCode.BadRequest
        var responseMessage: String

        if (userSession == null) {
            responseMessage = "Not Logged In"
        } else if (userController.getUserByUsername(userSession.username) == null) {
            responseMessage = "User does not exist"
        } else if (roomSession == null) {
            responseMessage = "Not currently a member of any room"
        } else if (roomController.getRoomById(roomSession.roomId) == null) {
            responseMessage = "Room does not exist"
        } else {
            val user = userController.getUserByUsername(userSession.username)!!
            roomController.leaveRoom(roomSession.roomId, user)

            if (roomController.getRoomSizeById(roomSession.roomId) == 0) {
                roomController.closeRoom(roomSession.roomId)
            }

            call.sessions.clear<RoomSession>()
            responseCode = HttpStatusCode.OK
            responseMessage = "Successfully left the room!"
        }

        call.respond(responseCode, responseMessage)
    }
}

fun Route.getRooms(roomController: RoomController) {
    get("/allRooms") {
        call.respond(HttpStatusCode.OK, Json.encodeToString(roomController.getRooms()))
    }
}