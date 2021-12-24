package com.ddxh2.routes

import com.ddxh2.controller.UserController
import com.ddxh2.session.UserSession
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*

fun Route.logOn(userController: UserController) {
    post("/logOn") {
        val userSession = call.sessions.get<UserSession>()
        var responseCode: HttpStatusCode = HttpStatusCode.BadRequest
        var responseMessage: String = ""
        if (userSession != null) {
            val username = userSession.username
            val newUser = userController.logOn(username)
            if (newUser != null) {
                responseCode = HttpStatusCode.OK
                responseMessage = "Welcome $username!"
            } else {
                responseMessage = "Failed to create a new user"
            }
        } else {
            responseMessage = "Failed to log in"
        }

        call.respond(responseCode, responseMessage)
    }
}

fun Route.logOut(userController: UserController) {
    delete("/logOut") {
        val userSession = call.sessions.get<UserSession>()
        val username: String? = userSession?.username
        userSession?.let {
            userController.logOut(it.username)
            call.sessions.clear<UserSession>()
        }
        call.respond(HttpStatusCode.OK, "Goodbye ${username ?: ""}")
    }
}

fun Route.getUsers(userController:UserController){
    get("/allUsers"){
        call.respond(HttpStatusCode.OK, userController.getUsers().toString())
    }
}