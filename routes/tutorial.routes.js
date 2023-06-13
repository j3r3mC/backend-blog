module.exports = app => {
    const tutorials = require("../controllers/tutorials.controller");
    var router = require("express").Router();

    app.post("/create", tutorials.create);

    app.get("/tutorials", tutorials.findAll);

    app.get("/tutorials/:id", tutorials.getTutorialById);

    app.post("/tutorials/edit", tutorials.postEditTutorial);

    app.post("/tutorials/delete", tutorials.postDeleteTutorial);

    app.use('/api', router);
};



