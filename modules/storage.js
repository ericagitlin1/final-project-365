'use strict';

let obj = {};

let articleInfo  = [];

let tweet = "";


obj.addArticleInfo = function(item){
    //Add all available article info
    articleInfo.push(item);
}

obj.getArticleInfo = function(){
    //Return the info stored in the array
    return articleInfo;
}

obj.clearArticleInfo = function(){
    //Clear the array storing article info
    articleInfo = [];
}

obj.setTweet = function(info){
    //Store info to tweet
    tweet = info;
}

module.exports = obj;