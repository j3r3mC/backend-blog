const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title       : { type : String },
    description : { type : String },
    video       : { type : String },
    author      : { type : String },
});
module.exports = mongoose.model("tutorial", userSchema);