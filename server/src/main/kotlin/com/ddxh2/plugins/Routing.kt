package com.ddxh2.plugins

import com.ddxh2.controllers.UserController
import com.ddxh2.routes.addUser
import com.ddxh2.routes.getUsers
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import org.koin.ktor.ext.inject

fun Application.configureRouting() {
    val userController by inject<UserController>()

    install(Routing){
        addUser(userController)
        getUsers(userController)
    }
}
