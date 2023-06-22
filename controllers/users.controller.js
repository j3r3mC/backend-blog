const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");




exports.create = async (req, res) => {
  try {
    const { name, email, img, password } = req.body;
    if (!(name, email, img, password)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exist. Please sign in!");
    }

    encryptedPassword = await bcryptjs.hash(password, 10);

    const uuid = require("uuid");
    const nameFile = uuid.v1().toString();

    const fs = require("./fs.controller");

    fs.saveImg(nameFile, req.body.img);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      img: nameFile,
      password: encryptedPassword,
    });


    const token = jwt.sign(
      { user_id: user._id, email },
      `${process.env.TOKEN_KEY}`
    );
    user.token = token;
    res.status(201).send(user);
  }
  catch (err) {
    console.log(err)
  }
};

exports.signIn = async (req, res) => {
  // Get user input
  const { email, password, img } = req.body;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  // Validate if user exist in our database
  const user = await User.findOne({ email });

  if (user && bcryptjs.compare(password, user.password)) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      `${process.env.TOKEN_KEY}`,
      {
        expiresIn: "2h",
      }
    );


    // save user token
    user.token = token;
    // user
    res.status(200).json(user);
  } else {
    res.status(400).send({
      message: "credentials is invalid"
    });
  }



}

exports.getAllUsers = (req, res) => {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });

}

exports.postEditUser = async (req, res, next) => {
  const id = await req.body.id
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  try {
    await User.updateOne(id, {
      name: updatedName,
      email: updatedEmail,
    });
    res.send(res.body);
    //res.redirect("/");
  } catch (err) {
    console.log(err)
  }

};

exports.postDeleteUser = async (req, res, next) => {
  const id = req.body.id;
  try {
    await User.findByIdAndRemove(id);
    res.status(202).send("User was delete successfully!");
    //res.redirect("/");
  } catch (err) {
    console.log(err)
  }
};