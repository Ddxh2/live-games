package com.ddxh2.plugins

import com.ddxh2.data.globals.generateUserId
import com.ddxh2.sessions.UserSession
import io.ktor.sessions.*
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.routing.*

fun Application.configureSecurity() {
    var guestCounter: Int = 0
    install(Sessions) {
        cookie<UserSession>("USER_SESSION") {
        }
    }

    intercept(ApplicationCallPipeline.Features) {
        var path: String = call.request.path()
        println("Path is $path")

        if (path.startsWith("/add-user")) {
            val session = call.sessions.get<UserSession>()
            println(call.parameters["username"])
            val username: String = call.parameters["username"] ?: "Guest ${guestCounter++}"

            if (session == null) {
                val userId: String = generateUserId()
                call.sessions.set(UserSession(userId, username))
            }
        } else if (path == "/delete-user") {
            call.sessions.clear<UserSession>()
        }

    }
}
