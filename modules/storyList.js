'use strict';

let obj = {};

let storyInfo = [];

obj.addStories = function(item) {
    storyInfo.push(item);
};

obj.getStories = function() {
    return storyInfo;
}

obj.clearStories = function (){
    //Clear the array storing Top Stories
    storyInfo = [];
}
module.exports = obj;
