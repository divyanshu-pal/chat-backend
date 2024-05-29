
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
       
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        // validate: {
        //     validator: function(value) {
        //         return /(?=.*\d)(?=.*[A-Z])(?=.*@)/.test(value);
        //     },
        //     message: props => `${props.value} is not a valid password. Password must contain at least one number, one uppercase letter, and '@' symbol.`
        // }       
    },
    isAvatarImageSet:{
        type:Boolean,
        dafault:false,
    },
    avatarImage:{
        type:String,
        default:"",
    },
})


module.exports = mongoose.model("users",userSchema)