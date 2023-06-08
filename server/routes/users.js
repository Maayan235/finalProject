const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const usersRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/tableconn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This help encrypt the password
const bcrypt = require('bcrypt');
const RecommendationsMatrix = require("../recommendations/recomandationsMatrix");
const saltRounds = 10; // you can adjust the number of salt rounds based on your security requirements


usersRoutes.route('/users/recommended/:id').get(function(req, res) {
  let user = {};
  const db_connect = dbo.getDb("RecipesWebsite");
  const userId = req.params.id;
  db_connect.collection('users').findOne({_id: ObjectId(userId)}, function(err, result) {
    if (err) throw err;
    json = JSON.stringify(result)
    user = JSON.parse(json)
    let recipies = RecommendationsMatrix.topKRecommendedrecipes(user.favoritesRecipes, user.myRecipes,6)
    res.json(recipies);
  });
});


// usersRoutes.route('/users/addToFavorites/:uid/:rid').get(function(req, res) {
//   let user = {};
//   const db_connect = dbo.getDb("RecipesWebsite");
//   const recipeId = req.params.rid;
//   const userId = req.params.uid;
//   db_connect.collection('users').findOne({_id: ObjectId(userId)}, function(err, result) {
//     if (err) throw err;
//     json = JSON.stringify(result)
//     user = JSON.parse(json)
//     let favorites = user.favorites;
//     favorites.push(recipeId)
//     let recipies = RecommendationsMatrix.topKRecommendedRecipies(user.favoritesRecipes,6)
//     res.json(recipies);
//   });
  
// });


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


// get user with spesific username and encrypted passward
usersRoutes.route('/users/find').get(function (req, res) {
  const db_connect = dbo.getDb("RecipesWebsite");
  const username = req.query.username;
  const password = req.query.password;

  db_connect.collection('users').findOne({ username: username }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send('User not found');
    } else {
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else if (result === true) {
          res.status(200).send(user);
        } else {
          res.status(401).send('Incorrect password');
        }
      });
    }
  });
});


// This section will help you add a user to the databas
usersRoutes.route('/users/add').post(function (req, res) {
  const newUser = req.body;
  newUser.favoritesRecipes = [];
  newUser.myRecipes = [];
  newUser.recommendedRecipes = [];

  bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      newUser.password = hash;
      let db_connect = dbo.getDb();
      db_connect.collection('users').insertOne(newUser, function (err, result) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.status(200).send(result);
        }
      });
    }
  });
});

// get user with specific ID
usersRoutes.route('/users/:id').get(function(req, res) {
  const db_connect = dbo.getDb("RecipesWebsite");
  const userId = req.params.id;
  db_connect.collection('users').findOne({_id: ObjectId(userId)}, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Route to remove a recipe from user favorites
usersRoutes.put('/users/removeFavorite/:recipeId/:userId', function (req, res) {
  try {
    const { recipeId, userId } = req.params;
    const db_connect = dbo.getDb('RecipesWebsite');

    db_connect.collection('users').findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $pull: { favoritesRecipes: recipeId } },
      { returnOriginal: false },
      function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(200).json(result.value);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to add a recipe to user favorites
usersRoutes.put('/users/addFavorite/:recipeId/:userId', function (req, res) {
  try {
    const { recipeId, userId } = req.params;
    const db_connect = dbo.getDb('RecipesWebsite');

    db_connect.collection('users').findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $push: { favoritesRecipes: recipeId } },
      { returnOriginal: false },
      function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(200).json(result.value);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = usersRoutes;
