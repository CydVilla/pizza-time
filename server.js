var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
const MongoClient = require("mongodb").MongoClient;
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var configDB = require("./config/database.js");

var db;

MongoClient.connect(configDB.url, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db();
  require("./app/routes.js")(app, db);
});

app.use(morgan("dev")); 
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs"); 

app.listen(port);
console.log("The magic happens on port " + port);

// Simple route for testing
// app.get('/', function(req, res) {
//   res.render('index');
// });
