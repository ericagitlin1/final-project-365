'use strict';

const express = require('express'),
	app = express(),
	request = require('request'),
	articleModule = require('./modules/storage.js'),
	storyModule = require('./modules/storyList.js'),
	passport = require('passport'), //used for logins and sessions
	cookieParser = require('cookie-parser'),//used for logins and sessions
	expressSession = require('express-session'),//used for logins and sessions
	TwitterStrategy = require('passport-twitter').Strategy,
	Twit = require('twit');

const TWITTER_CONSUMER_KEY = 'VU234SyhAAJW5EWZ19fKRcz2Q',
	TWITTER_CONSUMER_SECRET = 'TUweDJbo7ua0aC66Rti92TtHH7CjxZYERSvxWfDNd5BGm8g2X3',
	ACCESS_TOKEN = '1068734433656799232-5yeUmRcv4kRXBRvsSgi5At7EowrnZA',
	ACCESS_TOKEN_SECRET = '0pJu5Evld7bNN0lSxljeVouqGcr46Vy3nkvHNKjf5RRaC',
	callbackURL = 'http://localhost:3000/twitter/return';
    

app.use(express.static('resources'));
app.use(cookieParser());
app.use(expressSession({
	secret: 'secretthatnoonewilleverknow',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new TwitterStrategy({
	consumerKey: TWITTER_CONSUMER_KEY, 
	consumerSecret: TWITTER_CONSUMER_SECRET,
	callbackURL: callbackURL
},
function(token, tokenSecret, profile, done){
	return done(null, profile);
})
);
passport.serializeUser(function(user, callback){
	callback(null, user);
});
passport.deserializeUser(function(object, callback){
	callback(null, object);
});


let ensureAuthenticated = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	else {
		res.redirect('/');
	}
};

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.json()); // for parsing application/json
app.use(
	express.urlencoded({
		extended: true
	})
);

app.get('/', function(req, res) {
	res.render('login');

});

app.post('/tweetInfo', function(req){
	let tweet = {status: req.body.text};

	let MakeATweet = new Twit({
		consumer_key: TWITTER_CONSUMER_KEY, 
		consumer_secret: TWITTER_CONSUMER_SECRET,
		access_token: ACCESS_TOKEN,
		access_token_secret: ACCESS_TOKEN_SECRET
	}
	);

	MakeATweet.post('statuses/update', tweet , function() {
	});
});

app.get('/twitter/login', passport.authenticate('twitter'));

app.get('/twitter/return', passport.authenticate('twitter', {
	failureRedirect: '/'
}),
function(req, res) {
	res.redirect('/home');
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


app.get('/home', ensureAuthenticated, function(req,res){
	res.render('home');
});


app.post('/home', function(req, res) {
	request({
		method: 'GET',
		url: 'https://api.nytimes.com/svc/topstories/v2/home.json?{format}',
		qs: {
			'api-key': 'f0a4f818f6884462aba9a8b7f18c3c42',
			'results': 'results',
			'title': 'title',
			'abstract': 'abstract'
		},
		json: true}, 

	function(err, response, body) {
		let stories = body.results;
		stories.forEach(function(story){
			let storyObj = {
				title: story.title,
				abstract: story.abstract,
				url: story.url
			};
			storyModule.addStories(storyObj);
    
		});
		const storyList = storyModule.getStories();
		storyModule.clearStories();
		res.json(storyList);

	});

});

app.get('/search', ensureAuthenticated, function(req, res){
	res.render('web');
});

app.post('/search', ensureAuthenticated, function(req, res) {
	let result = req.body.article || 'apple';
	request ({
		method: 'GET',
		url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?',
		qs: {
			'api-key': 'f0a4f818f6884462aba9a8b7f18c3c42',
			'q': `${result}`
		},
		json: true},

	function(error,response,body){
		let arr = body.response.docs;
		arr.forEach(function(article){
			//If statement to ensure only Articles are added to the Module
			if(article.keywords.length !== 0){
				let articleObj = { 
					headline: article.headline.main,
					web_url: article.web_url,
					snippet: article.snippet
				};
				articleModule.addArticleInfo(articleObj);  
			}
		});
		const articleObj = articleModule.getArticleInfo();
		res.json(articleObj);
		articleModule.clearArticleInfo();  
	}); 
});



const server = app.listen(3000, function() {
	console.log(`Server started on port ${server.address().port}`);
});
