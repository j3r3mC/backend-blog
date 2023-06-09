module.exports = app => {
    const tutorials = require("../controllers/tutorials.controller");
    const auth = require("../middleware/auth");
    var router = require("express").Router();

    app.post("/create", auth, tutorials.create);

    app.get("/tutorials", auth, tutorials.getAllTutorials);

    app.get("/tutorial/:id", tutorials.getTutorialById);

    app.post("/tutorial/edit", auth, tutorials.postEditTutorial);

    app.post("/tutorial/delete", auth, tutorials.postDeleteTutorial);   

    app.use('/api', router);
};



