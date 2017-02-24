// Configs
var db_conf = require('./db_config.json');


// Modules
var express = require('express');
var bodyParser = require('body-parser');
var sendmail = require('sendmail')();
var mysql      = require('mysql');

// get json to work with POST requests
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var connection = mysql.createConnection({
  host     : db_conf.hostname,
  user     : db_conf.user,
  password : db_conf.password
});

var app = express();
var posts = [];
posts.push({
    id: 0,
    title: 'Lorem ipsum',
    content: 'Lorem ipsum dolor sit amet, test link adipiscing elit. This is strong. Nullam dignissim convallis est. Quisque aliquam. This is emphasized. Donec faucibus. Nunc iaculis suscipit dui. 53 = 125. Water is H2O. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. The New York Times (That’s a citation). Underline. Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.'
});

posts.push({
    id: 1,
    title: 'Pre formatted text',
    content: 'Typographically, preformatted text is not the same thing as code. Sometimes, a faithful execution of the text requires preformatted text that may not have anything to do with code. Most browsers use Courier and that’s a good default — with one slight adjustment, Courier 10 Pitch over regular Courier for Linux users.'
});

posts.push({
    id: 2,
    title: 'Fish Business',
    content: 'An American businessman took a vacation to a small coastal Mexican village on doctor’s orders. Unable to sleep after an urgent phone call from the office the first morning, he walked out to the pier to clear his head. A small boat with just one fisherman had docked, and inside the boat were several large yellowfin tuna. The American complimented the Mexican on the quality of his fish.'
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
app.get('/api/projects/create', function (req, res) {
  res.send(posts);
});
app.get('/api/projects/read', function (req, res) {
  connection.connect();

  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  });

  connection.end();
  res.send(posts);
});
app.get('/api/projects/update', function (req, res) {
  res.send(posts);
});
app.get('/api/projects/delete', function (req, res) {
  res.send(posts);
});
