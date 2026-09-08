const express = require('express')

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/',(req,res)=>{
  res.send("HEll0")
})

// without middleware
app.post('/health-check',(req,res)=>{
  const username = req.headers.username;
  const password = req.headers.password;
  const healthyKidneys = req.body.healthyKidneys;

  if (username?.toLowerCase() === 'sangameshvu136' && password === '12345'){
    if (healthyKidneys <= 2){
      res.status(200).json({
        'number of healthy kidneys' : healthyKidneys
      })
    }
    else{
      res.status(422).json({
        "message":'Invalid input'
      })
    }
  } else{
    res.status(401).json({
      "message":'Invalid Username or Passoword'
    })
  }
})
app.listen(3000,()=>{
  console.log(`the app is running on PORT: ${PORT}`)
})