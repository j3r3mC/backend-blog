module.exports = app => {
    const users = require("../controllers/users.controller");
    const auth = require("../middleware/auth");
    var router = require("express").Router();

    app.post("/register", users.create);

    app.post("/login", users.signIn);

    app.post("/welcome", auth, (req, res) => {
        res.status(200).send("Welcome 🙌 ");
      });

    

    app.use('/api', router);
};



