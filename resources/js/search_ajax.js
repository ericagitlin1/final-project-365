'use strict';

/* A simple Ajax example */
const ajax = new XMLHttpRequest();
ajax.open('GET', 'https://api.nytimes.com/svc/search/v2/articlesearch.json');

ajax.addEventListener('load', function() {
	console.log('Finished');
	console.log(typeof ajax.response);
	const article = JSON.parse(ajax.response.docs);

	const span = document.querySelector('#list'),
		text = document.createTextNode(article.headline.main);

	span.appendChild(text);
});

ajax.send();
console.log(typeof ajax.response);
console.log(`The response value is [${ajax.response}]`);