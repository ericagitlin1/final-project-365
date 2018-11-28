/*'use strict';

const ajax = new XMLHttpRequest();
ajax.open('GET', '/articlelist');

ajax.addEventListener('load', function() {
	console.log('Finished');
	console.log(ajax.response);
	const article = JSON.parse(ajax.response);
	const span = document.querySelector('#ArticleList'),
		text = document.createTextNode(article);
		span.appendChild(text);
		
});

ajax.send();
console.log(typeof ajax.response);
console.log(`The response value is [${ajax.response}]`);

let headlines = function() {
	let record = document.getElementById('articleList');

	return true;
}*/

'use strict';

const submitArticle = function(id) {
	const xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/search');
	xhrPost.setRequestHeader('Content-Type', 'application/json');

	xhrPost.addEventListener('load', function() {
		console.log('Finished!');
		console.log(xhrPost.response);

		const articles = JSON.parse(xhrPost.response),
			ul = document.querySelector('#ArticleList'),
			text = document.createTextNode(articles.headline),
			li = document.createElement('li');

		li.appendChild(text);
		ul.appendChild(li);
	});

	xhrPost.addEventListener('error', function() {
		console.error('Error occured :(');
	});

	xhrPost.timeout = 3 * 1000;
	xhrPost.addEventListener('timeout', function() {
		console.warn('Timeout');
	});

	xhrPost.send(
		JSON.stringify({
			articles: headline
		})
	);
};


