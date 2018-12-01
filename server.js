'use strict';

const express = require('express'),
    app = express(),
    request = require('request'),
    articleModule = require('./modules/storage.js'),
    storyModule = require('./modules/storyList.js'),
    passport = require("passport"), //used for logins and sessions
	cookieParser = require("cookie-parser"),//used for logins and sessions
	expressSession = require("express-session"),//used for logins and sessions
	LocalStrategy = require("passport-local").Strategy, //used for logins and sessions
	objL = {          //obj used to fill out the login template to make it  the login page 
		title: "Login",
		bottomMessage: "Don't have an account? Click the register tab!",
		homeTab: "login",
		secondaryTab: "Register", 
		submitButton: "Login",
		homeTabPath: "/",
		secondaryTabPath: "/home",
		httpAction: "/login_attempt"
	};

app.use(express.static('resources'));
app.use(cookieParser());
app.use(expressSession({
    secret: "secretthatnoonewilleverknow",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({usernameField: "username", passwordField: "password"},
        function(username,password,done){
            if(username !== password){
                return done(null, false, {
                        message: "Sorry, username or password not found"
                });
            }
            return done(null, {
                user: username
            });
        })
);
passport.serializeUser(function(user,done){
    done(null,user.user);
});
passport.deserializeUser(function(id,done){
    done(null,{
        user:id,
    });
});

let ensureAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("/");
    }
}

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.json()); // for parsing application/json
app.use(
	express.urlencoded({
		extended: true
	})
);

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})

app.get('/', function(req, res) {
    res.render('login', objL);

});

app.post("/login", passport.authenticate("local",{
	failureRedirect: "/",
	successRedirect: "/home"
}));

app.get('/home', function(req,res){
    res.render('home');
})

app.get('/search',function(req,res){
    res.render('web');
})

app.post('/home', function(req, res) {
    //res.send("Thanks! you've been logged in");
    //let { section: home, results: results } = req.body;
    request({
        method: "GET",
        url: "https://api.nytimes.com/svc/topstories/v2/home.json?{format}",
        qs: {
          'api-key': "f0a4f818f6884462aba9a8b7f18c3c42",
          'results': 'results',
          'title': 'title',
          'abstract': 'abstract'
        },
      json: true}, 

      function(err, response, body) {
        for(let i=0; i<11;i++){
            let x = body.results[i];
            let storyObj = {
                title: x.title,
                abstract: x.abstract,
                url: x.url
            }
            storyModule.addStories(storyObj);
        }
        const storyList = storyModule.getStories();
        res.json(storyList);

      });

});

app.post('/search', function(req, res) {
    let result = req.body.article || 'apple';
    request ({
    method: 'GET',
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?`,
    qs: {
        'api-key': "f0a4f818f6884462aba9a8b7f18c3c42",
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
                }
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
