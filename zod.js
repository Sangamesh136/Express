//  using zod for input validation

const express = require('express');
const zod = require("zod");

const PORT = 3000;

const app = express();

app.use(express.json());

const schema = zod.array(zod.number());

const authschema = zod.object({
  email: zod.email(),
  password: zod.string().min(8).regex(/[A-Z]/,'most contain alphabets').regex(/[0-9]/,"must contain numbers")
})

function userAuthCheck(req,res,next){
  // console.log('in validation')
  let creds = req.headers;
  console.log(creds)
  const result = authschema.safeParse(creds)

  if (!(result.success)){
    res.status(401).json({
      "Message":'Email/Password format is incorrect'
    });
  } else {
    console.log('correct format')
    next();
  }
}

app.post('/kidneys',userAuthCheck, (req,res)=>{
  let kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  if(!(response.success)){
    res.status(411).json({
      "message":'Enter valid input'
    })
  } else {
    res.status(200).json({
      'No. of Kidneys': kidneys.length
    })
  }
  // res.status(200).json(response)
})

app.use(function(err,req,res,next){
  res.send('Sorry there is some issue with the server');
})

app.listen(3000,()=>{
  console.log(`The server is listening @ PORT: ${PORT}`)
})
