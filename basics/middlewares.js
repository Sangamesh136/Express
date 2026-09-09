const express = require('express')

const app = express();

const PORT = 3000;

app.use(express.json());
app.get('/',(req,res)=>{
  res.send("HEll0")
})

// without middleware
// app.post('/health-check',(req,res)=>{
//   const username = req.headers.username;
//   const password = req.headers.password;
//   const healthyKidneys = req.body.healthyKidneys;

//   if (username?.toLowerCase() === 'sangameshvu136' && password === '12345'){
//     if (healthyKidneys <= 2){
//       res.status(200).json({
//         'number of healthy kidneys' : healthyKidneys
//       })
//     } else {
//       res.status(422).json({
//         "message":'Invalid input'
//       })
//     }
//   } else {
//     res.status(401).json({
//       "message":'Invalid Username or Passoword'
//     })
//   }
// })

// with middleware

function useAuthCheck(req,res,next){
  const username = req.headers.username;
  const pass = req.headers.password;
  if (!(username.toLowerCase() === 'sangameshvu136' || pass === 12345)){
    res.status(401).json(
      {"message":'Invalid username/password'}
    );

  } else {
  next();
  }
};


function useKidneyCheck(req,res,next){
  const kidneyNo = req.query.kidneyno;

  if (!(kidneyNo >=1 && kidneyNo <=2)){
    res.status(403).json(
      {"message":'Invalid input'}
    )
  } else {
    next();
  }
}

function processTime(req,res,next){
  const prc_start = process.hrtime.bigint();
  let sum = 1000*400;
  console.log("total:",sum);
  const prc_end = process.hrtime.bigint();
   req.prc_duration = Number(prc_end - prc_start)/1_000_000_000;
  next();

}
app.get('/health-check', useAuthCheck, useKidneyCheck, (req,res)=>{
  const kidneyNo = req.query.kidneyno;
  res.status(200).json(
    {"message": `no. of healthy kidneys: ${kidneyNo}`}
  )
})

app.get('/time', processTime, (req,res)=>{
  let timetaken = req.prc_duration
  console.log(timetaken)
  res.send(`Time taken for processing is ${timetaken}`)
})


app.listen(3000,()=>{
  console.log(`the app is running on PORT: ${PORT}`)
})
