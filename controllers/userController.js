const  User = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {generateToken}=require('../Auth');
const register = async function(req,res){     
    try {
           const {email,password,username} = req.body;
           const user = await User.findOne({username});
           const emaill = await User.findOne({email});
           
           if(user){
               return res.json({
                message:"username is already exist",status:false
               })
           }
           if(emaill){
            return res.json({
                message:"email is already exist",status:false
            })
           }
          
           const hashedPassword = await bcrypt.hash(password, 10);
           const newUser = new User({
            email,
            username,
            password:hashedPassword
           })
          const response = await newUser.save();
          // const token = generateToken(response.id);
          // req.token = token;
          // console.log(token);
    //  return  res.status(201).json({response:response,message:"successfull registerd",status:true})
      return res.json({ status: true, newUser });
           
    } catch (error){ 
        console.log(error);
        res.status(500).send("error creating user");
    }
}


const login = async (req, res, next) => {
    try {
      const { username, password} = req.body;
     
      const newUser = await User.findOne({username});
      console.log(newUser);
      if (!newUser)
        return res.status(409).json({
          message:"Incorrect username or password"
       })
   
      const isPasswordValid = await bcrypt.compare(password, newUser.password);
  

      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      delete newUser.password;
      return res.json({ status: true, newUser });

     
        
    
    
    } catch (error) {
        console.log(error);
        res.status(200).send("error while login");
      
    }
  };


  const getAllUsers = async(req,res,next)=>{
    try { //select all users not include currnent user id
        const users = await User.find({_id:{$ne:req.params.id}}).select([
              "email",
              "username",
              "avatarImage",
              "_id",
          ]);
           return res.json(users);
    } catch (error) {
       console.log(error);
       
      
    }
  }

   const setAvatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  };


 const logOut = (req, res, next) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  };
  
module.exports={
    register,login,setAvatar,getAllUsers,logOut
}

