const RecomandationsMatrix = require('./recommendations/recomandationsMatrix.js');

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(require("./routes/recipes"));
app.use(require("./routes/users"));
// get driver connection
const dbo = require("./db/tableconn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});


function xx(){
  setTimeout(() => {
    let recipies
    let db_connect = dbo.getDb("RecipesWebsite");
      db_connect
        .collection("recipes")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          //console.log(result);
          RecomandationsMatrix.createMatrix(result)
          //console.log(RecomandationsMatrix.getMatrix())
  });

  }, "3000");
}
xx()