const express = require("express");
const route = express.Router();

const { shortUrl, longUrl } = require("../contollers/shortCnt");

route.route("/").post(shortUrl);
route.route("/:shortUrl").get(longUrl);

module.exports = route;
