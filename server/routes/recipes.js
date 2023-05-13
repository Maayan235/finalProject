const RecomandationsMatrix = require('../recommendations/recomandationsMatrix.js');


const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recipesRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/tableconn");



// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recipesRoutes.route("/recipes").get(function (req, res) {
  let db_connect = dbo.getDb("RecipesWebsite");
  db_connect
    .collection("recipes")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


// This section will help you get a single record by id
recipesRoutes.route("/recipe/:id").get(function (req, res) {
  let db_connect = dbo.getDb("RecipesWebsite");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("recipes")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you get a list cuisines according to type.
recipesRoutes.route("/recipes/cuisine/:type").get(function (req, res) {
  let db_connect = dbo.getDb("RecipesWebsite");
  db_connect
    .collection("recipes")
    .find({types: {$elemMatch:{$eq: req.params.type}}})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


// This section will help you get a list of all the records.
recipesRoutes.route("/recipes/add").post(function (req, res) {
  const newRecipe = req.body; // assuming that the request body is a JSON object
  console.log(newRecipe)
  let db_connect = dbo.getDb();
  db_connect.collection("recipes").insertOne(newRecipe, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  // Maayan: return the reciepe (with id) in res.
  RecomandationsMatrix.addReciepeToMatrix(newRecipe)
  x =RecomandationsMatrix.getMatrix()
  //console.log(x)
    
});


recipesRoutes.route("/recipes/searched/:search").get(function (req, res) {
  let db_connect = dbo.getDb("RecipesWebsite");
  db_connect
    .collection("recipes")
    .find({title: {$regex: req.params.search, $options: 'i'}})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recipesRoutes.route("/recipes/searched/:search").get(function (req, res) {
  let db_connect = dbo.getDb("RecipesWebsite");
  db_connect
    .collection("recipes")
    .find({title: {$regex: req.params.search, $options: 'i'}})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


recipesRoutes.route("/recipes/edit/:id").put(function(req, res) {
  const recipeId = req.params.id;
  const updatedRecipe = req.body; // assuming that the request body is a JSON object
  
  let db_connect = dbo.getDb();
  
  db_connect.collection("recipes").updateOne({_id: ObjectId(recipeId)}, {$set: updatedRecipe}, function(err, result) {
    if (err) {
    console.log(err);
    res.status(400).send(err);
    } else {
    res.status(200).send(result);
    }
  });
});

recipesRoutes.route('/recipes/delete/:id').delete(function(req, res) {
  const recipeId = req.params.id;
  
  let db_connect = dbo.getDb();
  
  db_connect.collection('recipes').deleteOne({_id: ObjectId(recipeId)}, function(err, result) {
      if (err) {
      console.log(err);
      res.status(400).send(err);
      } else {
      res.status(200).send(result);
      }
    });
  });

  
module.exports = recipesRoutes;