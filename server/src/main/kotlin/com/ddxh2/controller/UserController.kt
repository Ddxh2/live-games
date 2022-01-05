package com.ddxh2.controller

import com.ddxh2.data.user.User
import io.ktor.http.cio.websocket.*
import java.util.concurrent.ConcurrentHashMap

class UserController {
    private val users = ConcurrentHashMap<String, User>()

    fun logOn(username: String): User? {
        if (!users.containsKey(username)) {
            val newUser = User(username)
            users[username] = newUser
            return newUser
        }
        return null
    }

    fun logOut(username: String) {
        users.remove(username)
    }

    fun addSocket(username: String, socket: WebSocketSession) {
        if (users.containsKey(username)) {
            val user: User? = users[username]
            println(user?.currentSocket)
            println(socket)
            user?.currentSocket = socket
        }
    }

    fun removeSocket(username: String) {
        users[username]?.currentSocket = null
    }

    fun getUserByUsername(username: String): User? {
        return users[username]
    }

    fun getUsers(): List<User> {
        return users.values.toList()
    }
}