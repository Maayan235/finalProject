const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const usersRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/tableconn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
usersRoutes.route("/users").get(function (req, res) {
  let db_connect = dbo.getDb("RecipesWebsite");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


//get user with spesific username ans passward
usersRoutes.route('/users/find').get(function(req, res) {
  const db_connect = dbo.getDb("RecipesWebsite");
  const username = req.query.username;
  const password = req.query.password;
  db_connect.collection('users').findOne({username: username, password: password}, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you add a user to the database.
usersRoutes.route("/users/add").post(function (req, res) {
  const newUser = req.body; // assuming that the request body is a JSON object
  let db_connect = dbo.getDb();
  db_connect.collection("users").insertOne(newUser, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });
});

module.exports = usersRoutes;
