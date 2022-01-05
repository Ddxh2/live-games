package com.ddxh2.plugins

import io.ktor.http.*
import io.ktor.features.*
import io.ktor.application.*

fun Application.configureHTTP() {
    install(CORS) {
        method(HttpMethod.Options)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        header(HttpHeaders.Authorization)
        header(HttpHeaders.ContentType)
        // header("any header") if you want to add any header
        allowCredentials = true
        allowNonSimpleContentTypes = true
//        anyHost()
        host("localhost:3000", schemes=listOf("http"))
    }

}
