var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

app.use(morgan("dev")); 
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs"); 

require("./app/routes.js")(app);

app.listen(port);
console.log("The magic happens on port " + port);

// Simple route for testing
// app.get('/', function(req, res) {
//   res.render('index');
// });
