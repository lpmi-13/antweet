
//module dependencies
var express = require('express'),
	bodyparser = require('body-parser'),
	path = require('path'),
	favicon = require('serve-favicon'),
	stylus = require('stylus'),
	nib = require('nib'),
	routes = require('./routes/index'),
    users = require('./routes/users'),
	twit = require('twit'),
	app = express();

	function compile(str, path) {
		return stylus(str)
		.set('filename', path)
		.use(nib());
	}

//setting jade templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//setting...ummm, the app, to...ummm...use something...?
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(stylus.middleware(
  { src: __dirname + '/public',
  compile: compile
  }
));


//storing API key variables to be accessed via heroku processes
var T = new twit({
	consumer_key: process.env.TWIT_CONSUMER_KEY,
	consumer_secret: process.env.TWIT_CONSUMER_SECRET,
	access_token: process.env.TWIT_ACCESS_TOKEN,
	access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET
});

app.get('/', function(req, res) {
	res.render('index', {"query": req.query.string});
});

app.post('/', function(req, res) {

	var tweet_top = req.body.str;

	function findTweet() {
	T.get('search/tweets', {q: tweet_top, count : 1 }, function (err, data, response) {
			var topd = data.statuses.map(function(t){
			return t.text;
		});
		res.render('result', {string: 'the tweet is ' + topd});
	});
}
	findTweet();
});

app.listen(process.env.PORT);