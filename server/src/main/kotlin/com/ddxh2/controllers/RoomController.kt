package com.ddxh2.controllers

import com.ddxh2.data.globals.GameHall
import com.ddxh2.data.room.Room
import com.ddxh2.data.user.User

class RoomController {
    private val gameHall = GameHall

    fun onOpen(key: String, name: String, maxOccupancy:Int = 2): Room {
        return gameHall.openRoom(key, name, maxOccupancy)
    }

    fun onClose(key: String) {
        gameHall.closeRoom(key)
    }

    fun onJoin(key: String, user: User) {
        val room: Room? = gameHall.rooms[key]
        if (room != null) {
            room.joinRoom(key, user)
        } else {
            println("Room does not exist")
        }
    }

    fun onLeave(key: String, user: User) {
        gameHall.rooms[key]?.leaveRoom(user)
    }

    fun getRooms(): List<Room> {
        return gameHall.rooms.values.toList()
    }
}