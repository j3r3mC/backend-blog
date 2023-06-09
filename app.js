require("dotenv").config();
require("./config/database").connect();

const express = require("express");

const app = express();

app.use(express.json());


require("./routes/user.routes")(app);


module.exports = app;