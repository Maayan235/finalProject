const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;


// get recipies from database.
//recomandationsMatrix.createMatrix(recipies)
recomandationsMatrix.createMatrix([{'id' : 7, 'tags' : ["kasher", "veg"], 'ingridients' : ["sugar", "water", "salt"], 'types' : ["italian", "fast"]}])
console.log(recomandationsMatrix.matrix)

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
