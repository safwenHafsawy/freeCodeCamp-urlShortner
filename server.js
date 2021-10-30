require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.use(cors());
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to database");
});

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// API endpoints
const shortenRoute = require("./routes/shortRoutes");
app.use("/api/shorturl", shortenRoute);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
