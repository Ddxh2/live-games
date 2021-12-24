package com.ddxh2.data.game

import com.ddxh2.data.user.User

interface Game{
    val players: List<User>
    var currentPlayer: User?
    var winner: User?

    suspend fun performAction(action:Any):Unit
    suspend fun startGame():Unit
    suspend fun endGame():Unit
    fun getNextPlayer():User
}