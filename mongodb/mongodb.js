const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sangameshvu136_db_user:E7LBjLf0AZV1a6MQ@cluster0.dfsxs3z.mongodb.net/?appName=Cluster0");

const User = mongoose.model('Users',{ name:String, email:String, password:String });

// const user = new User({
//     name: "Sam",
//     email: "sam@gmail.com",
//     password: "nutan123"
// })
const user2 = new User({
    name:"nutan",
    email:'nutan@gmail.com',
    password:'nutan@456'
})
console.log("user written");
user2.save();
return;
