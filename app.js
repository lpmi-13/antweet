var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var twit = require('twit');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.errorHandler());

var T = new twit({
	consumer_key: process.env.TWIT_CONSUMER_KEY,
	consumer_secret: process.env.TWIT_CONSUMER_SECRET,
	access_token: process.env.TWIT_ACCESS_TOKEN,
	access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET
});

// function findTweet() {
// 	T.get('search/tweets', {q: 'awesome', count : 5 }, function (err, data, response) {
// 		console.log(data.statuses.map(function(t){
// 			return t.text;
// 		}));
// 	});
// }

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

	// var reversed = req.body.str.split('').reverse().join('');
	// res.render('result', {string: reversed});
});
app.listen(process.env.PORT);