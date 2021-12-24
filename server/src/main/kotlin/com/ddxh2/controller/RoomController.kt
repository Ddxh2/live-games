package com.ddxh2.controller

import com.ddxh2.data.room.Room
import com.ddxh2.data.user.User
import com.ddxh2.exceptions.RoomDoesNotExistException
import io.ktor.http.cio.websocket.*
import io.ktor.util.*
import java.util.concurrent.ConcurrentHashMap

class RoomController {
    private val rooms = ConcurrentHashMap<String, Room>()

    private fun generateRoomId(): String {
        var roomId = generateNonce().substring(0, 8)

        while (rooms.containsKey(roomId)) {
            roomId = generateNonce().substring(0, 8)
        }

        return roomId
    }

    fun openRoom(): List<String> {
        val roomId = generateRoomId()
        val roomKey = generateNonce().substring(0, 5)
        rooms[roomId] = Room(roomId, roomKey)
        return listOf(roomId, roomKey)
    }

    fun closeRoom(roomId: String) {
        rooms.remove(roomId)
    }

    fun joinRoom(roomId: String, roomKey: String, user: User) {
        val room = rooms[roomId] ?: throw RoomDoesNotExistException()
        room.join(user, roomKey)
    }

    suspend fun leaveRoom(roomId: String, user: User) {
        rooms[roomId]?.leave((user))
    }

    fun getRoomById(roomId: String): Room? {
        return rooms[roomId]
    }

    fun getRoomSizeById(roomId: String): Int {
        return rooms[roomId]?.getSize() ?: 0
    }

    fun getRooms():List<Room>{
        return rooms.values.toList()
    }

    suspend fun startGame(roomId: String) {
        rooms[roomId]?.startGame()
    }

    suspend fun sendGameAction(roomId: String, action: Any) {
        rooms[roomId]?.performAction(action)
    }

    suspend fun sendMessage(roomId: String, message:String){
        rooms[roomId]?.sendMessage(message)
    }
}