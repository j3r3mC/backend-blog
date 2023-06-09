var  bcryptjs  = require ( "bcryptjs" ) ;
const jwt = require("jsonwebtoken");
const User = require("../model/user");


exports.create = async (req, res) => {
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

         const token= jwt.sign(
            {user_id: user._id, email},
            `${process.env.TOKEN_KEY}`
        );
        user.token = token;

        res.status(201).send( user );
    }
    catch(err){
        console.log(err)
    }    
};

exports.signIn = async (req, res) => {
    // Our login logic starts here
    try {
       // Get user input
       const { email, password } = req.body;
   
       // Validate user input
       if (!(email && password)) {
         res.status(400).send("All input is required");
       }
       // Validate if user exist in our database
       const user = await User.findOne({ email });
   
       if (user && (await bcryptjs.compare(password, user.password))) {
         // Create token
         const token = jwt.sign(
           { user_id: user._id, email },
           process.env.TOKEN_KEY,
           {
             expiresIn: "2h",
           }
         );
   
         // save user token
         user.token = token;
   
         // user
         res.status(200).json(user);
       }
       
     } catch (err) {
       console.log(err);
       res.status(400).send("Invalid Credentials");
     }
     // Our register logic ends here      
} 