
//module dependencies
var express = require('express'),
	bodyparser = require('body-parser'),
	path = require('path'),
	favicon = require('serve-favicon'),
	twit = require('twit'),
	app = express();


//setting jade templates
app.set('views', './views');
app.set('view engine', 'jade');

//setting...ummm, the app, to...ummm...use something...?
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(__dirname, 'public'));

//storing API key variables to be accessed via heroku processes
var T = new twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.TOKEN_SECRET
});

app.get('/', function(req, res) {
	res.render('index', {"query": req.query.string});
});

app.post('/', function(req, res) {

	var tweet_top = req.body.str;

	function findTweet() {
	T.get('search/tweets', {q: ['the', 'a', 'an', tweet_top, 'exclude:retweets'], count : 5 }, function (err, data, response) {
			var topd = data.statuses.map(function(t){
				return t.text;
		});

		res.render('result', {string: topd});
	});
}
	findTweet();
});

app.listen(process.env.PORT || 3000);