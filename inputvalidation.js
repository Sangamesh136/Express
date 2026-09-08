const express = require('express');

const PORT = 3000;

const app = express();

function userAuth(req,res,next){
  username = req.headers.username;
  password = req.headers.password;
  if (!(username.toLowerCase() === 'sangameshvu136' || password ==='Nutan@*')){
    res.status(401).json({
      "message": 'Incorrect user creds'
    })
  }
  next();
}

app.use(express.json());

app.post('/no-of-kidneys',userAuth,(req,res)=>{
  const kidneys = req.body.kidneys;
  let noOfKidneys = kidneys.length;
  console.log('no of kidneys:',noOfKidneys);
  // res.send(`No. of Kidney(s): ${noOfKidneys}`)
  res.status(200).json({
    "no. of Kidney(s)": noOfKidneys
  })
});

//(Global Catches middleware) (Error based middlewares) middleware to handle errors or execptions caused mainly due to invalid inputs
app.use(function(err,req,res,next){
  res.send("Sorry, server cant be reached")
})

app.listen(PORT,()=>{
console.log(`Server is running @ PORT: ${PORT}`)
});