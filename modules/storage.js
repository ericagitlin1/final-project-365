'use strict';

let obj = {};

let articleHeadlines  = [];

let searchItem  = "";

obj.setSearchItem = function(text){
    //Store input from the Search Box
    searchItem = text;
}

obj.getSearchItem  = function(){
    //Return the Input from the Search Box
    return searchItem;
}

obj.addArticleHeadlines = function(item){
    //Add all available article headlines
    articleHeadlines.push(item);
}

obj.getArticleHeadlines = function(){
    //Return the headlines stored in the array
    return articleHeadlines;
}

obj.clearArticleHeadlines = function(){
    //Clear the array storing article headlines
    articleHeadlines = [];
}

module.exports = obj;