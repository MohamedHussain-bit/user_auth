import express from 'express';
import bcrypt from 'bcrypt';

const app = express();
const port = 5000;

// in memory
const users = [];

app.use(express.json);

app.post('/register' , async (req , res) => {
    try{
        const {email , password} = req.body;
        // find user
        const findUser = users.find((data) => email == data.email);
        if(findUser){
            res.status(400).json({message : 'Wrong email and password'})
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password , 10)
        users.push({email , password : hashedPassword})
        res.status(201).json({message : 'Registered successfully'})
    }catch(err) {
        res.status(500).json({message : err.message})
    }
})

app.post('/login' , async (req , res) => {
    try{
 const {email , password} = req.body;
        // find user
        const findUser = users.find((data) => email == data.email);
        if(!findUser){
            res.status(400).json({message : 'Wrong email and password'})
        }
        const passwordMatch = await bcrypt.compare(password , findUser.password)
        if(passwordMatch){
            res.status(200).json({message : 'logged in sccessfuly'})
        } else{
            res.status(400).json({message : 'Wrong email and password'})
        }
}catch(err){
        res.status(500).json({message : err.message})
}
})

app.listen(port , () => {
    console.log(`Server listening on port ${port}`)
})