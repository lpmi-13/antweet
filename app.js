var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var twit = require('twit');

app.set('view engine', 'jade');

app.use(bodyparser.urlencoded({extended: false}));

var T = new twit({
	consumer_key:  'in7A1ZHEaTevLAGQeHKAlAp1o',
	consumer_secret: 'roZzZspwbiSv3BlZ0SDmxHX5E40eaR1NkwWkrLfKP2cWiexD9L',
	access_token: '3247362459-eZZuEkG4B1FoI5SsB3Wjdfcd2CvF8eqPy2Xjie2',
	access_token_secret: 'GgihfZQQsF95JJD6mvSECzaXhp7MZ1ROPSKIKso9loRVT'
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
		res.render('result', {string: topd});
	});
}
	findTweet();

	// var reversed = req.body.str.split('').reverse().join('');
	// res.render('result', {string: reversed});
});
app.listen(process.argv[2] || process.env.PORT);