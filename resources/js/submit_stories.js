'use strict';

const submitStories = function(title) {
	const xhrPost = new XMLHttpRequest();
	xhrPost.open('POST', '/home');
	xhrPost.setRequestHeader('Content-Type', 'application/json');

	xhrPost.addEventListener('load', function() {
		console.log('Finished!');
		console.log(xhrPost.response);

        const stories = JSON.parse(xhrPost.response);

        if (stories.length > 0) {
			stories.forEach(function(story) {
				const th = document.createElement('th'),
					tr = document.createElement('tr'),
					a = document.createElement('a'),
					text = document.createTextNode(story.title),
					abstract = document.createTextNode(story.abstract);

                a.href = story.url;   
				a.appendChild(text);
				th.appendChild(a);
				tr.appendChild(abstract);
				document.getElementById('stories').appendChild(th);
				document.getElementById('stories').appendChild(tr);
			});
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
		story: title}
	));
};

    let info = document.getElementById('title').value;
	console.log(info);
	document.getElementById('title').value = "";
	submitStories(info);
