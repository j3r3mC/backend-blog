require("dotenv").config();
require("./config/database").connect();
const cors = require("cors");
const bodyParser = require('body-parser');

const express = require("express");

const app = express();


var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '10mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//files.readFile("pictures_profil.csv");
//files.deleteFile("node_files/.csv");
//files.moveFile("pictures_profil.csv", "node_files/picture.csv");
//files.add();


require("./routes/user.routes")(app);
require("./routes/tutorial.routes")(app);



module.exports = app;