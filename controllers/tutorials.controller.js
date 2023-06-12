const Tutorial = require("../models/tutorial.model");


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
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
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
  const id = req.body.id;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedVideo = req.body.video;
  const updatedAuthor = req.body.author;

  try {
    await Tutorial.findByIdAndUpdate(id, {
      title: updatedTitle,
      description: updatedDescription,
      video: updatedVideo,
      author: updatedAuthor,

    });

    res.send(req.body);
    //res.redirect("/");
  } catch (err) {
    console.log(err)
  }

};

exports.postDeleteTutorial = async (req, res, next) => {
  const id = req.body.id;
  try {
    await Tutorial.findByIdAndRemove(id);
    res.status(202).send("Tutorial was delete successfully!");
    //res.redirect("/");
  } catch (err) {
    console.log(err)
  }
};


