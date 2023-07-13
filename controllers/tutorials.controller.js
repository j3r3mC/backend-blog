const Tutorial = require("../models/tutorial.model");
const { findById } = require("../models/user.model");


exports.create = async (req, res) => {
  try {
    const { title, description, video, author } = req.body;
    if (!(title || description || video || author)) {
      res.status(400).send("All input is required");
    }

    const tutorial = await Tutorial.create({
      title,
      description,
      video,
      author,
    });

    res.status(201).send(tutorial);
  }
  catch (err) {
    console.log(err)
  }
};

exports.findAll = (req, res) => {

  Tutorial.find()
    .then(data => {
      res.setHeader('Permissions-Policy', 'ch-ua-form-factor');
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.getTutorialById = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (data) {
        res.setHeader('Permissions-Policy', 'ch-ua-form-factor');
        res.setHeader("Accept - CH : Sec - CH - UA - Platform - Version");
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find tutorial with id: ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });

}


exports.postEditTutorial = async (req, res, next) => {
  const id = req.body.id
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedVideo = req.body.video;
  try {
    await Tutorial.updateOne({
      title: updatedTitle,
      description: updatedDescription,
      video: updatedVideo
    });
    res.send(res.body);
  } catch (err) {
    console.log(err)
  }

};

exports.postDeleteTutorial = async (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  const tuto = Tutorial.findById(id)
  Tutorial.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });

};


