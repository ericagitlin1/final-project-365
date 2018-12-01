'use strict';

let obj = {};

let storyInfo = [];

obj.addStories = function(item) {
    storyInfo.push(item);
};

obj.getStories = function() {
    return storyInfo;
}

module.exports = obj;
