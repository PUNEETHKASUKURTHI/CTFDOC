const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// create a new database
const db = new sqlite3.Database(':memory:');

// create a new table for users
db.serialize(function() {
  db.run('CREATE TABLE users (username TEXT, password TEXT)');
  db.run("INSERT INTO users VALUES ('puneeth', 'one')");
  db.run("INSERT INTO users VALUES ('william', 'two')");
  db.run("INSERT INTO users VALUES ('collin', 'three')");
  db.run("INSERT INTO users VALUES ('andrew', 'four')");
  db.run("INSERT INTO users VALUES ('nick', 'five')");
});

// define route for login page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/login.html');
});

// handle login form submission
app.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, row) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Internal server error');
    }

    if (!row) {
      return res.status(401).send('Invalid username or password');
    }

    res.send('Login successful!');
  });
});

// start the server
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});
