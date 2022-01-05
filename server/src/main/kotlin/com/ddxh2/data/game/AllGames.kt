package com.ddxh2.data.game

import com.ddxh2.data.user.User

object AllGames {
    val games: List<String> = listOf("TEST_GAME")

    val TEST_GAME: String = "TEST_GAME"
}

fun startGame(gameId: String, players: List<User>): Game {
    return when (gameId) {
        AllGames.TEST_GAME -> TestGame(players)
        else -> throw Error("No Game")
    }
}