'use strict';

let obj = {};

const articleHeadlines  = [];

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

module.exports = obj;