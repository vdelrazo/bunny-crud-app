var express = require("express");

var compression = require("compression");

var history = require("connect-history-api-fallback");

var staticMiddleWare = express.static("dist");
var app = express();
app.use(compression());
app.use(staticMiddleWare);
app.use(history());
app.use(staticMiddleWare);
app.use(express.static("dist"));
app.get("*.js", function (req, res, next) {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  next();
});
app.get("*.js", function (req, res, next) {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  next();
});
app.set("port", process.env.PORT || 3333);
app.listen(app.get("port"), function () {
  return console.log("Server @", app.get("port"));
});