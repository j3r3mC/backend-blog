


module.exports = app => {
    const User = require("../model/user");
    const jwt = require("jsonwebtoken");
    const bcryptjs = require("bcryptjs");
    var router = require("express").Router();

    app.post("/register", async (req, res) => {
        try{
            const { name, email, password } = req.body;
            if(!(name, email, password)){
                res.status(400).send("All input is required");
            }
            const oldUser =  await User.findOne({email});
            console.log(oldUser)
    
            if(oldUser) {
                return res.status(409).send("User already exist. Please sign in!");
            }
    
            encryptedPassword = await bcryptjs.hash(password, 10);
    
            const user = await User.create({
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });
    
            const token = jwt.sign(
                {user_id: user._id, email},
                `${process.env.TOKEN_KEY}`
            );
            user.token = token;
    
            res.status(201).send("hello" + user);
        }
        catch(err){
            console.log(err)
        }
    
    });
    
    app.post("/login", (req, res) => {
    
    });
    

    app.use('/api', router);
};



