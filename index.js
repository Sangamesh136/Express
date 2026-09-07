const express = require('express');

const port = 8000
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get('/',(req,res)=>{
  res.send('Hello world')
})

app.get('/route',(req,res)=>{
  res.json({name:'Sam',age: '23'})
})
app.listen(port,()=>{
  console.log(`The server is running on port: ${port}`)
})

// we get undefined because, we didn't use body parsor
app.post('/req',(req, res)=>{
  console.log(req.body)
  res.send(req.body)
})
