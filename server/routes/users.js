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

module.exports = usersRoutes;
