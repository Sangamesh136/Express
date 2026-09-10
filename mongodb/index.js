const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const mongoose = require('mongoose')

const PORT = 3000;
const jwtPassword = 12345678;
mongoose.connect("mongodb+srv://sangameshvu136_db_user:E7LBjLf0AZV1a6MQ@cluster0.dfsxs3z.mongodb.net/?appName=Cluster0");
const app = express();

app.use(express.json());

app.use((err,req,res,next)=>{
    res.status(500).json({
        "Message":"Issue with the server"
    });
})

app.get("/",(req,res)=>{
    res.status(200).json({
        "Message":"Hii there"
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running @ PORT: ${PORT}`)
})
