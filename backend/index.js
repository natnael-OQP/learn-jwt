const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const users = [
    {
        id: "1",
        username: "natnael",
        password: "natnael-oqp",
        isAdmin: true,
    },
    {
        id: "2",
        username: "jonas",
        password: "jonas",
        isAdmin: false,
    },
];

// middleware
app.use(express.json());

app.post("/api/login",async(req, res) => {   
    const user = users.find(user =>{
        return user.username === req.body?.username && user.password === req.body?.password;
    })
    if(user){
        res.json(user)
    }else{
        res.status(400).json("wrong credential ")
    }
})


app.listen(5000, () => console.log("Backend server is running!"));
