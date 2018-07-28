// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
let friends = require('./app/data/friends.js');
console.log(friends);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing and point static to public
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use("/public", express.static(path.join(__dirname, 'public')));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

// API
app.get("/api/friends", function(req, res) {
  return res.json(friends);
});


// Here we will want to create a new friend and do the calc comparison to find the most compatible friend.
app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  let newfriend = req.body;

  console.log("target:", friends[0].scores);

  let a;
  let b;
  let x = [];

  b = newfriend.scores;

  for (let i = 0; i < friends.length; i++) {

    a = friends[i].scores;
    let total = 0;

    for (let j = 0; j < 9; j++) {
      total += Math.abs(a[j]-b[j]);
    }

    x.push(total);
  }
  console.log(x);

 /// Put a for loop here to get the first lowest value, then save that index to call a match
  chosenFriend = x.indexOf(Math.min.apply(Math, x));

  console.log(chosenFriend);
/// Add friend to data
  friends.push(newfriend);

 /// Have the chose friend be the response 
  res.json(chosenFriend);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


