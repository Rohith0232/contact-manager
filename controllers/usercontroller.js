const asyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//registeruser
//route post api/user/register
//public

const RegisterUser = asyncHandler(async (req, res) => {
    const { UserName, Email, Password } = req.body;
    if (!UserName || !Email || !Password) {
        res.status(400);
        throw new Error("All fields are mandatory");

    }
    const useravailable = await User.findOne({ Email });
    if (useravailable) {
        res.status(400);
        throw new Error("user already registered");
    }
    //hashpassword

    const hashedpassword = await bcrypt.hash(Password, 10)
    console.log("hashedpassword :", hashedpassword);
    const createdUser = await User.create({
        UserName,
        Email,
        Password: hashedpassword
    })
    console.log(`user created ${createdUser}`);
    if (createdUser) {
        res.status(200).json({ _id: createdUser.id, Email: createdUser.Email })
    } else {
        throw new Error("user data not valid")
    }

});

//login user
//route post api/user/Login
//public

const LoginUser = asyncHandler(async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }
    const user = await User.findOne({ Email });
    //comapre password with bcrypt
    if (user && (await bcrypt.compare(Password, user.Password))) {
        const accestoken=jwt.sign({
            user:{
                UserName:user.UserName,
                Email:user.Email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"15min"
        });
        res.status(200).json({accestoken})
    }else{
        res.status(401);
        throw  Error("email or password is not valid")
    }


});

//current user
//route post api/user/current
//private

const CurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});

module.exports = { LoginUser, RegisterUser, CurrentUser };
