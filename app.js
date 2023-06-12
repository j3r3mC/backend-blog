require("dotenv").config();
require("./config/database").connect();
const cors = require("cors");

const express = require("express");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  

app.use(express.json());


require("./routes/user.routes")(app);
require("./routes/tutorial.routes")(app);


module.exports = app;