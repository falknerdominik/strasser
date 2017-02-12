var express = require('express');
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

app.get('/', function (req, res) {
  res.send("Welcome to your Blog API");
});

app.get('/api/posts', function (req, res) {
  res.send(posts);
});

app.use('/static', express.static('public'));

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});