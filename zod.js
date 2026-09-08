//  using zod for input validation

const express = require('express');
const zod = require("zod");

const PORT = 3000;

const app = express();

app.use(express.json());

const schema = zod.array(zod.number());

app.post('/kidneys',(req,res)=>{
  kidneys = req.body.kidneys
  const response = schema.safeParse(kidneys)
  res.status(200).json(response)
})

app.use(function(err,req,res,next){
  res.send('Sorry there is some issue with the server');
})

app.listen(3000,()=>{
  console.log(`The server is listening @ PORT: ${PORT}`)
})