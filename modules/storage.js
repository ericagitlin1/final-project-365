'use strict';

let obj = {};

const articles  = [];

let searchItem  = "";

obj.getSearchItem  = function(){
    //Return the Input from the Search Box
    return document.getElementById('SearchBox').value;
}

obj.addArticles = function(item){
    //Add top 10 articles
    articles.push(item);
}

obj.getArticles = function(){
    //Return contents of the articles Array
    return articles;
}

module.exports = obj;