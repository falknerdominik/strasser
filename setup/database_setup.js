var db_conf = require('../db_config.json');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : db_conf.hostname,
  user     : db_conf.user,
  password : db_conf.password,
  database : db_conf.database
});

connection.connect();

console.log("# Dropping all Tables and Database if they exist")
let tables = ["projects"]
// drop all tables if they already exist
tables.forEach(function(elem) {
  connection.query("DROP TABLE IF EXISTS ` " + elem + "`;",
    function(err, rows, fields) { if (err) throw err; });
});

// Init and create all tables
// project table
console.log("# Recreating all Tables")
let projectTableSQL = "CREATE TABLE IF NOT EXISTS `projects` (	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, description TEXT NOT NULL, imgs_path TEXT NOT NULL );";
connection.query(projectTableSQL, function(err, rows, fields) { if (err) throw err; });

connection.end();
