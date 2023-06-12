module.exports = app => {
    const tutorials = require("../controllers/tutorials.controller");
    const auth = require("../middleware/auth");
    var router = require("express").Router();

    app.post("/create", auth, tutorials.create);

    app.get("/tutorials", auth, tutorials.findAll);

    app.get("/tutorials/:id", tutorials.getTutorialById);

    app.post("/tutorials/edit", auth, tutorials.postEditTutorial);

    app.post("/tutorials/delete", auth, tutorials.postDeleteTutorial);   

    app.use('/api', router);
};



