const express = require("express");
const mongoose = require("mongoose");

const PORT = 3000;
const app = express();

mongoose.connect("mongodb+srv://sangameshvu136_db_user:E7LBjLf0AZV1a6MQ@cluster0.dfsxs3z.mongodb.net/?appName=Cluster0");

const User = mongoose.model("User",{
    email:String,
    name:String,
    password: String
})

app.use(express.json());

app.post('/signup',async (req,res)=>{
    const userExists = await User.findOne({email:req.body.email});
    if (userExists){
        res.status(400).send("User already exists, please login");
    }
    const user = new User({
        email : req.body.email,
        name : req.body.name,
        password: req.body.password
    })

    await user.save();
    return res.status(200).json({
        "message":"saved successfully"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running @ PORT: ${PORT}`)
})
