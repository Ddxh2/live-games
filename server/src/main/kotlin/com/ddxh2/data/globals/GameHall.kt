package com.ddxh2.data.globals

import com.ddxh2.data.user.User
import io.ktor.util.*

object GameHall {
    val users: MutableMap<String, User> = mutableMapOf<String, User>()

    fun addUser(userId: String, username: String): User {
        val newUser = User(userId = userId, username = username)
        users[userId] = newUser
        return newUser
    }

    fun removeUser(userId:String ) {
        users.remove(userId)
    }
}

fun generateUserId(): String{
    var userId: String = generateNonce()

    while (GameHall.users.containsKey(userId)) {
        userId = generateNonce()
    }
    return userId
}