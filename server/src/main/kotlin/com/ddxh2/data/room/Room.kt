package com.ddxh2.data.room

import com.ddxh2.data.game.Game
import com.ddxh2.data.game.TestGame
import com.ddxh2.data.user.User
import com.ddxh2.exceptions.AlreadyInRoomException
import io.ktor.http.cio.websocket.*
import kotlinx.serialization.Serializable
import java.lang.reflect.Type

@Serializable
data class Room(val roomId: String, private val key: String) {
    private val members: MutableList<User> = mutableListOf<User>()

    private var currentGame: Game? = null

    fun join(user: User, roomKey: String): Unit {
        if (members.contains(user)){
            throw AlreadyInRoomException()
        }
        if (roomKey == key) {
            members.add(user)
        }
    }

    suspend fun leave(user: User) {
        members.remove(user)
        user.currentSocket?.close()
    }

    fun getSize():Int{
        return members.size
    }

    suspend fun startGame() {
        currentGame = TestGame(members)
        currentGame!!.startGame()
    }

    suspend fun performAction(action: Any) {
        currentGame!!.performAction(action)
    }

    suspend fun sendMessage(message:String){
        members.forEach{member->member?.currentSocket?.send(Frame.Text(message))}
    }
}