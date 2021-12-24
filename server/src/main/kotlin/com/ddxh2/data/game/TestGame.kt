package com.ddxh2.data.game

import com.ddxh2.data.user.User
import io.ktor.http.cio.websocket.*

class TestGame(override var players: List<User>) : Game {
    private var gameState: Boolean = false;
    override var currentPlayer: User? = null
    override var winner: User? = null

    override suspend fun startGame(): Unit {
        winner = null
        gameState = false
        currentPlayer = players.random()
        currentPlayer!!.currentSocket!!.send(Frame.Text("The game has started, make a move"))
    }

    override suspend fun endGame(): Unit {
        val message =
            "Game ${if (gameState) "over" else "not over"} ${if (winner != null) "winner is ${winner!!.username}" else ""}"
        for (player in players) {
            player.currentSocket!!.send(Frame.Text(message))
        }
    }

    override fun getNextPlayer(): User {
        return players[(players.indexOf(currentPlayer) + 1) % players.size]
    }

    override suspend fun performAction(action: Any) {
        if (action is TestGameAction) {
            when (action) {
                TestGameAction.I_WIN -> {
                    winner = currentPlayer
                    gameState = true
                    endGame()
                }
                TestGameAction.I_LOSE -> {
                    winner = getNextPlayer()
                    gameState = true
                    endGame()
                }
                TestGameAction.DO_NOTHING -> {
                    currentPlayer = getNextPlayer()
                    currentPlayer!!.currentSocket!!.send(Frame.Text("Perform Action"))
                }
            }
        }
    }
}

enum class TestGameAction {
    I_WIN,
    I_LOSE,
    DO_NOTHING,
}