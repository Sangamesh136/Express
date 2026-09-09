const express = require('express');
const zod = require('zod');

const PORT = 3000;

const app = express();

app.use(express.json());

function userAuthCheck(obj){
    let authschema = zod.object({
        email: zod.email(),
        password: zod.string().min(8).regex(/[A-Z]/,"atlease 1 capital alphabet").regex(/[0-9]/,"atleast 1 number")
    })
    console.log("checking...")
    const response = authschema.safeParse(obj);
    console.log(response)
    return response;
}

app.post('/login',(req,res)=>{

    let response = userAuthCheck(req.body);
    console.log("response")
    if (!(response.success)){
        res.status(401).json({
            "message":"Invalid input format"
        })
    }
    res.status(200).json({
        "message":"valid input format"
    })
})
app.use((err,req,res,next)=>{
    res.status(404).json({
        "message":'encountered some error at server side'
    })
})

app.listen(PORT,()=>{
    console.log(`App is listening @ PORT ${PORT}`)
})
