package com.ddxh2.routes

import com.ddxh2.controllers.UserController
import com.ddxh2.sessions.UserSession
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.http.cio.websocket.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*
import io.ktor.websocket.*
import kotlinx.coroutines.channels.consumeEach

fun Route.addUser(userController: UserController) {
    get("/addUser") {
        val session = call.sessions.get<UserSession>()

        if (session != null) {
            userController.onJoin(session.userId, session.username)
            call.respond(HttpStatusCode.OK, "Successfully join. Id: ${session.userId}. Username: ${session.username}")
        }

        call.respond(HttpStatusCode.BadRequest, "Failed")
    }
}

fun Route.getUsers(userController: UserController) {
    get("/") {
        call.respond(HttpStatusCode.OK, userController.getUsers().toString())
    }
}