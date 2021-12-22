package com.ddxh2.data.room

import com.ddxh2.data.user.User

class Room(val key: String, val name: String, val maxOccupancy: Int = 2) {
    var members: MutableList<User> = mutableListOf<User>()

    fun joinRoom(roomKey: String, user: User) {
        if (roomKey == key) {
            if (members.size < maxOccupancy) {
                members.add(user)
            } else {
                println("Room Full")
            }
        } else {
            println("Wrong Key")
        }
    }

    fun leaveRoom(user: User){
        members = members.filter{it != user} as MutableList<User>
    }

    override fun toString():String{
        var returnString = "Room(key: $key, name: $name, maxOccupancy: $maxOccupancy){ members: ["
        for (user in members){
            returnString += "${user.toString()}, "
        }
        returnString += "]"
        return "$returnString }"
    }
}