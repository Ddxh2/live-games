package com.ddxh2.data.user

import io.ktor.http.cio.websocket.*
import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

@Serializable(with = UserSerializer::class)
data class User(val username: String) {
    var currentSocket: WebSocketSession? = null
    override fun toString(): String {
        return "User(username:$username)"
    }
}

object UserSerializer : KSerializer<User> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("User", PrimitiveKind.STRING)
    override fun serialize(encoder: Encoder, value: User) {
        encoder.encodeString(value.username)
    }

    override fun deserialize(decoder: Decoder): User {
        return User(decoder.decodeString())
    }
}