const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  longUrl: String,
  shortUrl: Number,
});

module.exports = mongoose.model("url", urlSchema);
