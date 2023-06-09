module.exports = app => {
    const users = require("../controllers/users.controller");
    const auth = require("../middleware/auth");
    var router = require("express").Router();

    app.post("/register", users.create);

    app.post("/login", users.signIn);

    app.get("/users",auth, users.getAllUsers);

    app.get("/user/:id", users.getUserById);

    app.post("/user/edit",auth,users.postEditUser);

    app.post("/user/delete", auth, users.postDeleteUser);
 
    //route for test middleware login
    app.post("/welcome", auth, (req, res) => {
        res.status(200).send("Welcome 🙌 ");
      });

    

    app.use('/api', router);
};



