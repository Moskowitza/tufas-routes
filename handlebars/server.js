// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var PORT = process.env.PORT || 3000;
// Instantiate our Express App
var app = express();
// Set the app up with morgan.
// morgan is used to log our HTTP Requests. By setting morgan to 'dev'
// the :status token will be colored red for server error codes,
// yellow for client error codes, cyan for redirection codes,
// and uncolored for all other codes.
app.use(logger("dev"));
// Setup the app with body-parser and a static folder for handling form submissions
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));


// Require our routes
var routes = require("./routes");
app.use(routes)

// Connect Handlebars to our Express app
// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local tufasdb database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tufas";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on http://localhost:" + PORT);
});
