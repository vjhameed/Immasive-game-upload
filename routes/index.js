var express = require("express");
var router = express.Router();
var AdmZip = require("adm-zip");
const path = require("path");
var fs = require("fs");
var uniqid = require("uniqid");

/* GET home page. */
router.post("/uploadgame", function(req, res, next) {
  var zip = new AdmZip(req.files.gamefile.data);
  const gamefolder = `/games/${uniqid()}`;
  const gamepath = path.resolve(__dirname, `../public${gamefolder}`);
  fs.mkdirSync(gamepath);
  zip.extractAllTo(gamepath);
  const filepath =
    req.protocol + "://" + req.get("host") + gamefolder + "/index.html";
  res.json({ link: filepath });
});

module.exports = router;
