'use strict';

const express = require('express'),
    app = express(),
    request = require('request');

app.use(express.static('resources'));

app.set('view engine', 'pug');
app.set('views', 'static/views');

app.get('/', function(req, res) {
    res.render('web');
});
    request ({
    method: 'GET',
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    qs: {
        'api-key': "f0a4f818f6884462aba9a8b7f18c3c42"
      },
    json: true
},
function(error,response,body){
        console.log(body);

});


const server = app.listen(3000, function() {
	console.log(`Server started on port ${server.address().port}`);
});

