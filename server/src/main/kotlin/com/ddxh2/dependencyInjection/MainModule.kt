package com.ddxh2.dependencyInjection

import com.ddxh2.controllers.UserController
import org.koin.dsl.module

val mainModule = module {
    single { UserController() }
}