// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");

// Initialize Express
var app = express();
// Set the app up with morgan.
// morgan is used to log our HTTP Requests. By setting morgan to 'dev'
// the :status token will be colored red for server error codes,
// yellow for client error codes, cyan for redirection codes,
// and uncolored for all other codes.
app.use(logger("dev"));
// Setup the app with body-parser and a static folder
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "tufas";
var collections = ["routes", "notes"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
  res.send(index.html);
});
// Handle form submission, save submission to mongo
app.post("/submit", function(req, res) {
  console.log(req.body);
  // Insert the note into the notes collection
  db.notes.insert(req.body, function(error, saved) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    else {
      // Otherwise, send the note back to the browser
      // This will fire off the success function of the ajax request
      res.send(saved);
    }
  });
});


// 2. At the "/all" path, display every entry in the animals collection
app.get("/all", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.routes.find({}, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
  db.notes.find({}, function(error, found) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    else {
      // Otherwise, send json of the notes back to user
      // This will fire off the success function of the ajax request
      res.json(found);
    }
  });
});

// Select just one note by an id
app.get("/find/:id", function(req, res) {
  // When searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IdYouWantToFind))

  // Find just one result in the notes collection
  db.notes.findOne(
    {
      // Using the id in the url
      _id: mongojs.ObjectId(req.params.id)
    },
    function(error, found) {
      // log any errors
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the note to the browser
        // This will fire off the success function of the ajax request
        console.log(found);
        res.send(found);
      }
    }
  );
});


// Update just one note by an id
app.post("/update/:id", function(req, res) {
  // When searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IdYouWantToFind))

  // Update the note that matches the object id
  db.notes.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      // Set the title, note and modified parameters
      // sent in the req body.
      $set: {
        title: req.body.title,
        note: req.body.note,
        modified: Date.now()
      }
    },
    function(error, edited) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

// Delete One from the DB
app.get("/delete/:id", function(req, res) {
  // Remove a note using the objectID
  db.notes.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
    function(error, removed) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(removed);
        res.send(removed);
      }
    }
  );
});

// Clear the DB
app.get("/clearall", function(req, res) {
  // Remove every note from the notes collection
  db.notes.remove({}, function(error, response) {
    // Log any errors to the console
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      // Otherwise, send the mongojs response to the browser
      // This will fire off the success function of the ajax request
      console.log(response);
      res.send(response);
    }
  });
});
// 3. At the "/name" path, display every entry in the animals collection, sorted by name
app.get("/setter", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by name (1 means ascending order)
  db.routes.find().sort({ setter: 1 }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 4. At the "/weight" path, display every entry in the animals collection, sorted by weight
app.get("/grade", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order)
  db.routes.find().sort({ grade: -1 }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
