// Configs
var db_conf = require('./db_config.json');


// Modules
var express = require('express');
var bodyParser = require('body-parser');
var sendmail = require('sendmail')();
var mysql = require('mysql');
var app = express();

// get json to work with POST requests
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var connection = mysql.createConnection({
  host     : db_conf.hostname,
  user     : db_conf.user,
  password : db_conf.password,
  database : db_conf.database
});


// handle contact form - send email
app.post('/api/mail', function (req, res) {
  // get req params
  let mail = req.body;

  // regex for validation
  var nameRegex = /^[A-Za-z\s]{6,20}$/;
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var txtRegex = /^[A-Za-z\s\?!.,]{30,600}$/;
  var isValid = nameRegex.test(mail.name);
  isValid = isValid && emailRegex.test(mail.email);
  isValid = isValid && txtRegex.test(mail.text);

  if(isValid) {
    sendmail({
      from: mail.email,
      to: "falkner.dominik@gmail.com",
      subject: "Anfrage von " + mail.name,
      html: mail.text
    }, function(err, reply) {
        console.log(err);
    });
    res.send("YES");
  } else {
    res.status(404).send('Not found');
  }
});

app.use('/', express.static('static/compiled'));
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// API
app.post('/api/projects/create', function (req, res) {
  connection.connect();
  let sql = "INSERT INTO projects VALUES(?, ?, ?, ?);"
  // it auto incrments
  connection.query(sql, [null, "project" + String(i), "Beispiel Beschreibung", "img/bagger1.jpg;"],
    function(err, rows, fields) { if (err) throw err; });
  connection.end();
});

app.post('/api/projects/read', function (req, res) {
  connection.connect();

  let sql = "SELECT * FROM projects;";
  connection.query(sql, function(err, rows, fields) {
    if (err) throw res.status(500).send();
    res.send(rows);
    console.log(rows);
  });

  connection.end();
});

app.post('/api/projects/update', function (req, res) {
  connection.connect();
  let sql = "UPDATE projects SET name = ?, description = ?, imgs_path = ? WHERE id = ?;";
  connection.query(sql, [req.body.name, req.body.description, req.body.imgs_path, req.body.id],
    function(err, rows, fields) {
      if (err) throw res.status(500).send();
      res.send(200);
      console.log(rows);
    });
  connection.end();
});

app.get('/api/projects/delete', function (req, res) {
  connection.connect();
  let sql = "DROP FROM projects WHERE id = ?";
  connection.query(sql, [req.body.id],
    function(err, rows, fields) {
      if (err) throw res.status(500).send();
      res.send(200);
      console.log(rows);
    });
  connection.end();
});
