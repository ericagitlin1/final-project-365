'use strict';

let obj = {};

let articleInfo  = [];



obj.addArticleInfo = function(item){
	//Add all available article info
	articleInfo.push(item);
};

obj.getArticleInfo = function(){
	//Return the info stored in the array
	return articleInfo;
};

obj.clearArticleInfo = function(){
	//Clear the array storing article info
	articleInfo = [];
};


module.exports = obj;