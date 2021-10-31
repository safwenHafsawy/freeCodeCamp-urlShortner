const urlModel = require("../models/urlmodel");

const shortUrl = (req, res) => {
  let urlPatt = /http\:\/\/www.[a-zA-Z0-9]+.com/;
  const { url } = req.body;
  if (!urlPatt.test(url)) {
    return res.status(400).send("INVALID");
  }
  urlModel.find({}, (err, data) => {
    if (err) return res.status(400).json({ error: err });
    let urlNumber = 0;
    data.forEach((ele) => {
      if (ele["shortUrl"] > urlNumber) {
        urlNumber = ele["shortUrl"];
      }
    });
    urlNumber += 1;
    const urlDB = new urlModel({
      longUrl: url,
      shortUrl: urlNumber,
    });

    urlDB.save().then(() => {
      urlNumber += 1;
      res.status(201).json({ original_url: url, short_url: urlNumber });
    });
  });
};

const longUrl = (req, res) => {
  const { shortUrl } = req.params;
  urlModel.findOne({ shortUrl: shortUrl }, (err, data) => {
    if (err) return res.status(400).json({ err });
    const { longUrl } = data;
    return res.status(200).redirect(longUrl);
  });
};

module.exports = { shortUrl, longUrl };
