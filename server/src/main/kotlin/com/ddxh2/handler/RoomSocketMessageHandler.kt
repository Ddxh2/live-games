package com.ddxh2.handler

import com.ddxh2.data.room.Room
import io.ktor.http.cio.websocket.*

suspend fun roomSocketMessageHandler(room:Room, frame: Frame){
    if(frame is Frame.Text){
        val text = frame.readText()
        println(text)
        room.sendMessage(text)
    }
}