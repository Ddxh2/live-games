package com.ddxh2.data.globals

import com.ddxh2.data.room.Room
import com.ddxh2.data.user.User
import com.ddxh2.exceptions.UserExistsException
import io.ktor.util.*

object GameHall {
    val users: MutableMap<String, User> = mutableMapOf<String, User>()
    val rooms: MutableMap<String, Room> = mutableMapOf<String, Room>()

    fun addUser(userId: String, username: String): User {
        if(users.containsKey(userId)){
            throw UserExistsException()
        }
        val newUser = User(userId = userId, username = username)
        users[userId] = newUser
        return newUser
    }

    fun removeUser(userId: String) {
        users.remove(userId)
    }

    fun openRoom(key: String, name: String, maxOccupancy: Int = 2): Room {
        val newRoom = Room(key, name, maxOccupancy)
        rooms[key] = newRoom
        return newRoom
    }

    fun closeRoom(key: String) {
        rooms.remove(key)
    }

    fun getUserById(userId: String): User? {
        return users[userId]
    }

    fun getRoomByKey(roomKey: String): Room? {
        return rooms[roomKey]
    }
}

fun generateUserId(): String {
    var userId: String = generateNonce()

    while (GameHall.users.containsKey(userId)) {
        userId = generateNonce()
    }
    return userId
}

fun generateRoomKey(): String {
    var roomKey: String = generateNonce()
    while (GameHall.rooms.containsKey(roomKey)) {
        roomKey = generateNonce()
    }
    return roomKey
}