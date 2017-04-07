var db_conf = require('../db_config.json');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : db_conf.hostname,
  user     : db_conf.user,
  password : db_conf.password,
  database : db_conf.database
});

connection.connect();

console.log("# Inserting dummy data into projects")
let insertSQL = "INSERT INTO " + db_conf.database + ".projects VALUES(?, ?, ?, ?);"
for(let i = 0; i < 10; ++i) {
  connection.query(insertSQL, [null, "project" + String(i), "Beispiel Beschreibung", "img/bagger1.jpg;"],
    function(err, rows, fields) { if (err) throw err; });
}

connection.end();
