module.exports = app => {
  const users = require("../controllers/users.controller");
  var router = require("express").Router();

  app.post("/register", users.create);

  app.post("/login", users.signIn);

  app.get("/users", users.getAllUsers);

  app.get("/users/:id", users.getUserById);

  app.put("/users/:id", users.postEditUser);

  app.post("/users/delete", users.postDeleteUser);

  app.get("/users/:id/:file", users.getImage);

  //route for test middleware login
  app.post("/welcome", (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });



  app.use('/api', router);
};



