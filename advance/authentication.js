const express = require("express");
const zod = require("zod");

const PORT = 3000;
const app = express();

app.use(express.json());

function validateInput(obj) {
    const inputSchema = zod.object({
        email: zod.string().email(),
        password: zod.string()
            .min(8)
            .regex(/[A-Z]/, "At least 1 capital")
            .regex(/[0-9]/, "At least 1 number")
    });
    return inputSchema.safeParse(obj);
}

function searchForUser(obj){
    const response = validateInput(req.body);
    if (!(response.success)){
        res.status(401).json({
            "Message":'enter valid input'
        })
    }
    // write additonal code:
}

app.post('/signin', (req, res) => {

    const checkUser = searchForUser(req.body);
    if (!(checkUser)){
        res.status(403).json({
            "message":"User not found"
        })
    } else {
        res.status(200).json({
            "message":"signed in successfully"
        })
    }
});

app.use((err, req, res, next) => {
    res.status(404).json({
        "message": 'Server error'
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening @ PORT: ${PORT}`)
});
