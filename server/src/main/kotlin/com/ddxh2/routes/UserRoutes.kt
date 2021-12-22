package com.ddxh2.routes

import com.ddxh2.controllers.UserController
import com.ddxh2.sessions.UserSession
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*

fun Route.addUser(userController: UserController) {
    get("/add-user") {
        val session = call.sessions.get<UserSession>()

        if (session != null) {
            userController.onJoin(session.userId, session.username)
            call.respond(HttpStatusCode.OK, "Successfully joined. Id: ${session.userId}. Username: ${session.username}")
        }

        call.respond(HttpStatusCode.BadRequest, "Failed")
    }
}

fun Route.getUsers(userController: UserController) {
    get("/all-users") {
        call.respond(HttpStatusCode.OK, userController.getUsers().toString())
    }
}