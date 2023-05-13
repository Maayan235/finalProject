const { MongoClient } = require("mongodb");
const RecommendationsMatrix = require("../recommendations/recomandationsMatrix");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("RecipesWebsite");
        console.log("Successfully connected to MongoDB.");
        _db
        .collection("recipes")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          RecommendationsMatrix.createMatrix(result) 
          console.log(RecommendationsMatrix.getMatrix())
        });
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};
