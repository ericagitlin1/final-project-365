'use strict';

const submitArticle = function(term) {
	const xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/search');
	xhrPost.setRequestHeader('Content-Type', 'application/json');

	xhrPost.addEventListener('load', function() {
		
		const articles = JSON.parse(xhrPost.response);

		if (articles.length > 0) {
			const table = document.getElementById('ArticleTable');
			while (table.hasChildNodes()) {
				table.removeChild(table.firstChild);
			}
			articles.forEach(function(article) {
				const tr = document.createElement('tr'),
					tr2 = document.createElement('tr'),
					a = document.createElement('a'),
					text = document.createTextNode(article.headline),
					snippet = document.createTextNode(article.snippet);

				a.href = article.web_url; 
				a.appendChild(text);
				tr.appendChild(a);
				tr2.appendChild(snippet);	
				table.appendChild(tr);
				table.appendChild(tr2);
			});
			
		}
    });

	xhrPost.addEventListener('error', function() {
		console.error('Error occured :(');
	});

	xhrPost.send(JSON.stringify({
		article: term}
	));
};

document.getElementById("SearchButton").addEventListener('click', function(evt){

	evt.preventDefault();
    let info = document.getElementById('SearchBox').value;
	document.getElementById('SearchBox').value = "";
	submitArticle(info);

});

