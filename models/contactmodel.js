const mongoose= require("mongoose");
const contactschema= mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"

    },
    UserName:{
        type:String,
        required:[true,"please add contact name "]
    },
    Phone:{
        type:String,
        required:[true,"please add contact phone number "]
    },
    Email:{
        type:String,
        required:[true,"please add contact email "]
    }
},
    {
        timestamps:true
    
});

module.exports=mongoose.model("Contacts",contactschema)