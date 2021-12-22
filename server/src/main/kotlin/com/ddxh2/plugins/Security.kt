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
        cookie<UserSession>("USER_SESSION"){
        }
    }

    intercept(ApplicationCallPipeline.Features){
        if(call.sessions.get<UserSession>()== null){
            val userId = generateUserId()
            val username = call.parameters["username"] ?: "Guest ${guestCounter++}"
            call.sessions.set(UserSession(userId = userId, username= username))
        }
    }
}
