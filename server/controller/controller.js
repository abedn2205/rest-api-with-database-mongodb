//filename controller.js

// import model
const userdb = require("../model/model");

//create and save data user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "data cannot be empty!" });
    return;
  }

  //get data request form json / form-url-encoded
  const user = new userdb({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
  });
  user
    .save()
    .then((data) => {
      res.status(201).json({
        message: "success created data user",
        Data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Internal Server error" });
    });
};

// get data user by parameter or get all data user
exports.find = (req, res) => {
  if (req.query.username) {
    const userName = req.query.username;
    userdb
      .findOne({
        username: userName,
      })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "cannot Found Username " + userName });
        } else {
          res.json({
            message: "Success get data user",
            Data: data,
          });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Internal server error" });
      });
  } else {
    userdb
      .find()
      .then((data) => {
        res.json({
          message: "Success get all data",
          Data: data,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Internal Server Error" });
      });
  }
};

// update data user by parameter username
exports.update = (req, res) => {
  try {
    userdb
      .findOneAndUpdate({ username: req.params.username }, req.body, {
        new: true,
      })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: "Cannot update user with username" + req.params.username,
          });
        } else {
          res.json({
            message: "Success update data user",
            Data: data,
          });
        }
      });
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal Server error" });
  }
};

// delete data user by spesified username in request
exports.delete = (req, res) => {
  const userName = req.params.username;

  userdb.findOneAndDelete({ username: userName }).then((data) => {
    if (!data) {
      res.status(404).send({
        message: "Cannot delete user with suername" + req.params.username,
      });
    } else {
      res.json({
        message: "Success delete data user",
      });
    }
  });
};
