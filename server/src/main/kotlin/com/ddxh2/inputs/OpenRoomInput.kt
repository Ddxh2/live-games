package com.ddxh2.inputs

import kotlinx.serialization.Serializable

@Serializable
data class OpenRoomInput(
    val roomName: String?, val maxOccupancy: Int = 2
)
