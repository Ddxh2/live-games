package com.ddxh2.routes

import com.ddxh2.controllers.RoomController
import com.ddxh2.data.globals.GameHall
import com.ddxh2.data.globals.generateRoomKey
import com.ddxh2.data.user.User
import com.ddxh2.sessions.UserSession
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*

fun Route.openRoom(roomController: RoomController) {
    get("/open-room") {
        val roomName: String? = call.parameters["roomName"]
        val maxOccupancy: Int = call.parameters["maxOccupancy"]?.toInt() ?: 2
        if (roomName != null) {
            val roomKey = generateRoomKey()
            val newRoom = roomController.onOpen(roomKey, roomName, maxOccupancy)
            call.respond(
                HttpStatusCode.OK,
                "Successfully opened room called: '${newRoom.name}' with key ${newRoom.key}"
            )
        } else {
            call.respond(HttpStatusCode.BadRequest, "No Room Name Supplied")
        }
    }
}

fun Route.closeRoom(roomController: RoomController){
    delete("/delete-room"){
        val roomKey:String? = call.parameters["roomKey"]
        var responseCode:HttpStatusCode = HttpStatusCode.BadRequest
        var responseMessage:String = ""

        if(roomKey != null){
            roomController.onClose(roomKey)
            responseCode = HttpStatusCode.OK
            responseMessage = "Successfully closed the room with key $roomKey"
        } else {
            responseMessage = "No room key supplied"
        }
        call.respond(responseCode, responseMessage)
    }
}

fun Route.joinRoom(roomController: RoomController) {
    get("/join-room") {
        val roomKey: String? = call.parameters["roomKey"]
        var responseMessage: String = ""
        var responseCode: HttpStatusCode = HttpStatusCode.BadRequest
        if (roomKey != null) {
            val userId: String? = call.sessions.get<UserSession>()?.userId
            if (userId != null) {
                val user: User? = GameHall.getUserById(userId)
                if (user != null) {
                    roomController.onJoin(key = roomKey, user = user)
                    responseCode = HttpStatusCode.OK
                    responseMessage="Successfully added user ${user.username} to room with key ${roomKey}"
                } else {
                    responseMessage = "User doesn't exist"
                }
            } else {
                responseMessage = "User Id is Null"
            }
        } else {
            responseMessage = "Room Key is Null"
        }

        call.respond(responseCode, responseMessage)

    }
}

fun Route.leaveRoom(roomController: RoomController){
    get("/leave-room"){
        var responseCode = HttpStatusCode.BadRequest
        var responseMessage = ""

        val roomKey:String? = call.parameters["roomKey"]

        if(roomKey != null){
            val userId: String? = call.sessions.get<UserSession>()?.userId
            if (userId != null) {
                val user: User? = GameHall.getUserById(userId)
                if (user != null) {
                    roomController.onLeave(key = roomKey, user = user)
                    responseCode = HttpStatusCode.OK
                    responseMessage="Successfully removed user ${user.username} from room with key ${roomKey}"
                } else {
                    responseMessage = "User doesn't exist"
                }
            } else {
                responseMessage = "User Id is Null"
            }
        }else {
            responseMessage = "Room Key Not Supplied"
        }

        call.respond(responseCode, responseMessage)
    }
}

fun Route.getRooms(roomController: RoomController){
    get("/all-rooms"){
        call.respond(HttpStatusCode.OK, roomController.getRooms().toString())
    }
}