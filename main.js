//loading the express 
const express = require('express');
const cors    = require('cors');
const env     = require('dotenv').config();
//loading the chatBot 
const chatBot = require("./routes/chatbot");
const db = require("./db");
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const app = express();
app.use(cors()); // to make the server cors free.
//enable POST Request 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to taskAPI</h1>");
});

//consuming the taskRouter here
const taskRouter = require("./routes/tasks.routes");
const userRouter = require('./routes/users.routes');
app.use("/api/tasks",taskRouter);
app.use("/api/users",userRouter);
app.use("/api/chat",chatBot);
app.listen(PORT,HOST,()=>{
    console.log(`Express server has started at http://${HOST}:${PORT}/`);
})