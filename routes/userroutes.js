const express=require("express");
const { LoginUser,RegisterUser,CurrentUser, } = require("../controllers/usercontroller");
const tokenvalidation=require("../middleware/tokenvalidation");
const router=express.Router();

router.post("/login",LoginUser);

router.post("/register",RegisterUser)


router.get("/current",tokenvalidation , CurrentUser)

module.exports=router;