const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const PORT = 3000;
const jwtPassword = '1234567'
const app = express();

app.use(express.json());

const ALL_USERS = [
    {
        "email":"sam@gmail.com",
        "password":"Nutan@123",
        "age":23,
        "employement": false
    },
    {
        "email":"nutan@gmail.com",
        "password":"Nutan@456",
        "age":22,
        "employment": true
    },
    {
        "email":"sangamesh@gmail.com",
        "password":"Nutan@789",
        "age":24,
        "employment":true
    }
]

function searchForUser(obj){
    const inputSchema = zod.object({
        email: zod.email(),
        password: zod.string()
            .min(8)
            .regex(/[A-Z]/, "At least 1 capital")
            .regex(/[0-9]/, "At least 1 number")
    });
    const validation = inputSchema.safeParse(obj);
    if (!(validation.success)){
        return false;
    }
    let email = obj.email;
    let password = obj.password;
    for(let i = 0; i<=ALL_USERS.length-1; i++){
        if (ALL_USERS[i].email === email && ALL_USERS[i].password === password){
            return true;
        }
    }
    return false;
}

app.post('/signin', (req, res) => {
    const checkUser = searchForUser(req.body);
    if (!(checkUser)){
        res.status(403).json({
            "message":"User not found"
        })
        return
    }
    let token = jwt.sign({email:req.body.email},jwtPassword);
    res.status(200).json({
        token,
    })
});

app.get('/users',(req,res)=>{
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token,jwtPassword);
        const email = decoded.email;
        result = ALL_USERS.filter(user => user.email !== email);
        res.status(200).json(result);

    } catch(err) {
        res.status(403).send(err)
    }
})

app.use((err, req, res, next) => {
    res.status(500).json({
        "message": 'Server error'
    });

});

app.listen(PORT, () => {
    console.log(`Server is listening @ PORT: ${PORT}`)
});
