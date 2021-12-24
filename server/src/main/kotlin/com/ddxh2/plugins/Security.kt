package com.ddxh2.plugins

import com.ddxh2.session.RoomSession
import com.ddxh2.session.UserSession
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
        cookie<RoomSession>("ROOM_SESSION") {
        }
    }

    intercept(ApplicationCallPipeline.Features) {
        var path: String = call.request.path()

        if (path.startsWith("/logOn")) {
            val session = call.sessions.get<UserSession>()

            if (session == null) {
                var username: String = call.receive()
                username = if (username == "") "Guest ${guestCounter++}" else username
                call.sessions.set(UserSession(username))
            }
        } else if (path.startsWith("/joinRoom")) {
            val session = call.sessions.get<RoomSession>()
            val roomId: String? = call.parameters["roomId"]
            println("Getting room id")
            if (session == null && roomId != null) {
                call.sessions.set(RoomSession(roomId))
            }
        }
    }
}
