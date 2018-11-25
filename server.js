'use strict';

const express = require('express'),
    app = express(),
    request = require('request'),
    articleModule = require('./modules/storage.js');

app.use(express.static('resources'));

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', function(req, res) {
    let result = req.query.term;
    res.render('web');

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
        //console.log(articleModule.getArticleHeadlines());
    });
});

app.get('/search', function(req, res) {
    const list = articleModule.getArticleHeadlines();
    res.json(list);
    res.render('search');

});


const server = app.listen(3000, function() {
	console.log(`Server started on port ${server.address().port}`);
});
