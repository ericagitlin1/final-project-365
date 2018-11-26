'use strict';

const express = require('express'),
    app = express(),
    request = require('request'),
    articleModule = require('./modules/storage.js');

app.use(express.static('resources'));

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', function(req, res) {
    res.render('web',{
        articles : articleModule.getArticleHeadlines()
    });
});

app.get('/search', function(req, res) {

    let result = req.query.term;
    request ({
    method: 'GET',
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${result}`,
    qs: {
        'api-key': "f0a4f818f6884462aba9a8b7f18c3c42"
      },
    json: true},

    function(error,response,body){
        let arr = body.response.docs;
        arr.forEach(function(article){
            articleModule.addArticleHeadlines(article.headline.main);  
        });
    });

    const articleList = articleModule.getArticleHeadlines();
    res.json(articleList);

    articleModule.clearArticleHeadlines();
});


app.get('/articleList', function(req, res) {
    const list = articleModule.getArticleHeadlines();
    res.json(list);
});


const server = app.listen(3000, function() {
	console.log(`Server started on port ${server.address().port}`);
});
