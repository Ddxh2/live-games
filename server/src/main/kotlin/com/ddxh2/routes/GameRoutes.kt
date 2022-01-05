package com.ddxh2.routes

import com.ddxh2.data.game.AllGames
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

fun Route.getAllGames() {
    get("/allGames") {
        val jsonString = Json.encodeToString(AllGames.games)
        call.respond(HttpStatusCode.OK, jsonString)
    }
}