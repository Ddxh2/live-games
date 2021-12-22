package com.ddxh2.controllers

import com.ddxh2.data.globals.GameHall
import com.ddxh2.data.user.User

class UserController {
    private val gameHall = GameHall

    fun onJoin(userId: String, username: String): User {
        return gameHall.addUser(userId, username)
    }

    fun onLeave(userId: String) {
        gameHall.removeUser(userId)
    }

    fun getUsers(): List<User> {
        return gameHall.users.values.toList()
    }
}
