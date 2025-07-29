const userController = require("../controllers/users.controller");
const express = require('express');
const userRouter = express.Router();

//signup api
userRouter.post("/signup",userController.signup);
userRouter.post("/signin",userController.signin);
//signin api

module.exports = userRouter;
console.log("user router is working");