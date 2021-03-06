var ejs = require('ejs');
var pathFn = require('path');
var fs = require('fs');

ejs.filters.jsonformat = function(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

var rss2TmplSrc = pathFn.join(__dirname, '../atlnews.ejs');
var rss2Tmpl = ejs.compile(fs.readFileSync(rss2TmplSrc, 'utf8'));

module.exports = function(locals){
  var config = this.config;
  var feedConfig = config.atlnews;

  var posts = locals.posts.sort('-date');
  if (feedConfig.limit) posts = posts.limit(feedConfig.limit);

  var xml = rss2Tmpl({
    config: config,
    posts: posts,
    feed_url: config.root + feedConfig.path
  });

  return {
    path: feedConfig.path,
    data: xml
  };
};