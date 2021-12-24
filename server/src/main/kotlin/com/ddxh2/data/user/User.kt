package com.ddxh2.data.user

import io.ktor.http.cio.websocket.*
import kotlinx.serialization.Serializable

@Serializable
data class User(val username:String){
    var currentSocket: WebSocketSession? = null
}