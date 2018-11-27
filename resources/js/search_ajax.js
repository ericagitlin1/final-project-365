'use strict';

const ajax = new XMLHttpRequest();
ajax.open('GET', '/articlelist');

ajax.addEventListener('load', function() {
	console.log('Finished');
	console.log(ajax.response);
	const article = JSON.parse(ajax.response);
	const span = document.querySelector('#articlelist');
	let articles = article.response.docs;
	for(let i = 0;i<articles.length;i++) {
		let text = document.createTextNode(articles[i].headline.main);
		span.appendChild(text);
	}
});

ajax.send();
console.log(typeof ajax.response);
console.log(`The response value is [${ajax.response}]`);

