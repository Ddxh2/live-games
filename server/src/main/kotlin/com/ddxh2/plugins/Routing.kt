package com.ddxh2.plugins

import com.ddxh2.controllers.RoomController
import com.ddxh2.controllers.UserController
import com.ddxh2.routes.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import org.koin.ktor.ext.inject

fun Application.configureRouting() {
    val userController by inject<UserController>()
    val roomController by inject<RoomController>()

    install(Routing){
        addUser(userController)
        getUsers(userController)
        openRoom(roomController)
        closeRoom(roomController)
        joinRoom(roomController)
        leaveRoom(roomController)
        getRooms(roomController)
    }
}
