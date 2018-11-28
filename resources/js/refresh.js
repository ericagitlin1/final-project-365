'use strict';

const refreshMainPage = function() {
    const xhrGet = new XMLHttpRequest();

    xhrGet.open('GET', '/storylist');
     
	xhrGet.addEventListener('load', function() {
		console.log('refreshed!');
        if (xhrGet.status >= 400) {
			console.error(`Status code ${xhrGet.status} returned :(`);
			return;
        }

        setTimeout(refreshMainPage, 5 * 1000);

        const articleList = JSON.parse(xhrGet.response);
		if (articleList.length > 0) {
			const parentDiv = document.querySelector('#ArticleList');
			while (parentDiv.hasChildNodes()) {
				parentDiv.removeChild(parentDiv.firstChild);
			}

            const ul = document.createElement('ul');
			articleList.forEach(function(article) {
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
    
    xhrGet.send();
};

setTimeout(refreshMainPage, 5 * 1000);
