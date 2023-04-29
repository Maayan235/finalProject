const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up multer middleware to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded successfully.");
});


// other routes
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
