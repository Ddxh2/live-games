package com.ddxh2.dependencyInjection

import com.ddxh2.controller.RoomController
import com.ddxh2.controller.UserController
import org.koin.dsl.module

var mainModule = module {
    single {
        RoomController()
    }

    single{
        UserController()
    }
}