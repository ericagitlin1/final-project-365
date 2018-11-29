'use strict';

const submitArticle = function(term) {
	const xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/search');
	xhrPost.setRequestHeader('Content-Type', 'application/json');

	xhrPost.addEventListener('load', function() {
		console.log('Finished!');
		console.log(xhrPost.response);

		const articles = JSON.parse(xhrPost.response);

		if (articles.length > 0) {
			const parentDiv = document.querySelector('#ArticleList');
			while (parentDiv.hasChildNodes()) {
				parentDiv.removeChild(parentDiv.firstChild);
			}
			const ul = document.createElement('ul');
			articles.forEach(function(article) {
				const li = document.createElement('li'),
					a = document.createElement('a'),
                    text = document.createTextNode(article);
                    
				a.appendChild(text);
				li.appendChild(a);
				ul.appendChild(li);
			});
			parentDiv.appendChild(ul);
		}
    });

	xhrPost.addEventListener('error', function() {
		console.error('Error occured :(');
	});

	xhrPost.timeout = 3 * 1000;
	xhrPost.addEventListener('timeout', function() {
		console.warn('Timeout');
	});

	xhrPost.send(JSON.stringify({
		article: term}
	));
};

document.getElementById("SearchButton").addEventListener('click', function(evt){

	evt.preventDefault();
    let info = document.getElementById('SearchBox').value;
	console.log(info);
	document.getElementById('SearchBox').value = "";
	submitArticle(info);

});

