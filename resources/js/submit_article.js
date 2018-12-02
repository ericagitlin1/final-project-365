'use strict';

const submitArticle = function(term) {
	const xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/search');
	xhrPost.setRequestHeader('Content-Type', 'application/json');

	xhrPost.addEventListener('load', function() {
		
		const articles = JSON.parse(xhrPost.response),
			numofArticles = articles.length;
		
		let idInitializer = [];

		if (articles.length > 0) {
			for(let y = 0;y<numofArticles;y++) {
				idInitializer[y] = y+1;
			}
			const table = document.getElementById('ArticleTable');
			while (table.hasChildNodes()) {
				table.removeChild(table.firstChild);
			}
			let idArrayVariable = 0;
			articles.forEach(function(article) {

				const tr = document.createElement('tr'),
					td = document.createElement('td'),
					div = document.createElement('div'),
					div2 = document.createElement('div'),
					a = document.createElement('a'),
					button = document.createElement('button'),
					text = document.createTextNode(article.headline),
					snippet = document.createTextNode(article.snippet);
				
				button.innerHTML = "Tweet";
				button.id = "twitter_button_"+idInitializer[idArrayVariable];
				tr.id = "row_"+idInitializer[idArrayVariable];
				a.id = "url_"+idInitializer[idArrayVariable];
				div2.id = "snippet_"+idInitializer[idArrayVariable];
				td.id = "tweetColumn";


				a.href = article.web_url; 
				a.appendChild(text);
				div.appendChild(a);
				div2.appendChild(snippet);
				tr.appendChild(div);
				tr.appendChild(div2);
				tr.appendChild(td);
				td.appendChild(button);
				table.appendChild(tr);
				idArrayVariable+=1;
			});
			
		for(let y = 0;y<numofArticles;y++){
			let buttonID = document.getElementById("twitter_button_"+idInitializer[y]);
			buttonID.addEventListener('click', function(){
				let tweet = document.getElementById("url_"+idInitializer[y]).href;
				submitTweet(tweet);
				document.getElementById("twitter_button_"+idInitializer[y]).innerHTML = "Tweeted";

			});
		}	
	}
});
	

	xhrPost.addEventListener('error', function() {
		console.error('Error occured :(');
	});

	xhrPost.send(JSON.stringify({
		article: term}
	));
};

const submitTweet = function(tweet) {
	const xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/tweetInfo');
	xhrPost.setRequestHeader('Content-Type', 'application/json');
	xhrPost.send(JSON.stringify({
        text: tweet
    }));
}


document.getElementById("SearchButton").addEventListener('click', function(evt){

	evt.preventDefault();
    let info = document.getElementById('SearchBox').value;
	document.getElementById('SearchBox').value = "";
	submitArticle(info);

});

