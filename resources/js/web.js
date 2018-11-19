'use strict';

document.getElementById("SearchButton").onclick = function(){
    location.href = `localhost:3000/search`
    let info = document.getElementById('SearchBox').value;
    console.log(info);
    
};

