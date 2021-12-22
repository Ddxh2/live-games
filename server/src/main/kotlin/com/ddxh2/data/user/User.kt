package com.ddxh2.data.user

data class User (var userId:String, var username:String){
    override fun toString():String{
        return "{ userId: $userId, username: $username }"
    }
}