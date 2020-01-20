const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//importing Api from routes
const authApi = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = "mongodb://localhost:27017/Edge";

mongoose.connect(
  mongoURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.log("MongoDB not Connected");
    } else {
      console.log("MongoDB connected Successfully");
    }
  }
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use("/user", authApi);

app.listen(port, err => {
  if (err) {
    console.log("Sever interrupted");
  } else {
    console.log("server Started at Port:", port);
  }
});

module.exports = app;
