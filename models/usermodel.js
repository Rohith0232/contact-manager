const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    UserName :{
        type:String,
        required:[true,"please add the user name"]
    },
    Email :{
        type:String,
        required:[true,"please add the user email"],
        unique:[true,"email is already taken"]
    },
    Password :{
        type:String,
        required:[true,"please add the user password"]
    },
    
},
{
        timestamp:true
    });



module.exports= mongoose.model("user",UserSchema);