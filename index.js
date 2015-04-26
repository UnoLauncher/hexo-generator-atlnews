var merge = require('utils-merge');
var pathFn = require('path');

var config = hexo.config.atlnews = merge({
  limit: 20
}, hexo.config.atlnews);

// Set default feed path
if (!config.path){
  config.path = 'news.json';
}

// Add extension name if don't have
if (!pathFn.extname(config.path)){
  config.path += '.json';
}

hexo.extend.generator.register('atlnews', require('./lib/generator'));