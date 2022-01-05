package com.ddxh2

import io.ktor.application.*
import com.ddxh2.plugins.*
import com.ddxh2.dependencyInjection.mainModule

fun main(args: Array<String>): Unit =
    io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // application.conf references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {
    install(org.koin.ktor.ext.Koin){
        modules(mainModule)
    }
    configureHTTP()
    configureSockets()
    configureRouting()
    configureSerialization()
    configureMonitoring()
    configureSecurity()
}
