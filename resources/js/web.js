'use strict';

document.getElementById("SearchButton").onclick = function(){
    location.href = `localhost:3000/search`
    let info = document.getElementById('SearchBox').value;
    console.log(info);

    let articles = info.response.docs;
    for(let i = 0;i<articles.length;i++) {
        console.log(articles[i].headline)
    }
    
};

