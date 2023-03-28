const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run('CREATE TABLE users (username TEXT, password TEXT)');
  db.run("INSERT INTO users VALUES ('puneeth', 'one')");
  db.run("INSERT INTO users VALUES ('william', 'two')");
  db.run("INSERT INTO users VALUES ('collin', 'three')");
  db.run("INSERT INTO users VALUES ('andrew', 'four')");
  db.run("INSERT INTO users VALUES ('nick', 'five')");
});

module.exports = db;
