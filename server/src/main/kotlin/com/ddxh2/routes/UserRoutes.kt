package com.ddxh2.routes

import com.ddxh2.controllers.UserController
import com.ddxh2.data.globals.generateUserId
import com.ddxh2.data.user.User
import com.ddxh2.exceptions.UserExistsException
import com.ddxh2.sessions.UserSession
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*

fun Route.addUser(userController: UserController) {
    post("/add-user") {
        val userSession = call.sessions.get<UserSession>()
        var username = call.parameters["username"]
        println("username is $username and userSession username is ${userSession?.username}")
        if (userSession != null && (username == null || username == userSession.username)) {
            username = userSession.username
            val userId = userSession.userId
            try {
                userController.onJoin(userId, username)
            } catch (e: UserExistsException) {
                call.respond(HttpStatusCode.BadRequest, e.message!! as String)
            }
            call.respond(HttpStatusCode.OK, "Added user $username with id $userId")
        }
        call.respond(HttpStatusCode.BadRequest, "Already logged in")
    }
}

fun Route.getUsers(userController: UserController) {
    get("/all-users") {
        call.respond(HttpStatusCode.OK, userController.getUsers().toString())
    }
}