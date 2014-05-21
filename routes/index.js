var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/twitter', function(req, res) {
  url = 'https://twitter.com/meltwater';
  
  utils.getTweets(url, function(data) {
    if (data) {
      res.render('twitter', { title: 'Tweets by Meltwater', tweets: data });
    }
    else console.log("error");  
  });
});

router.get('/news', function(req, res) {
  url = 'http://www.electronista.com/articles/';
  
  utils.getNews(url, function(data) {
    if (data) {
      res.render('news', { title: 'News from Electronista', news: data });
    }
    else console.log("error");  
  });
});

module.exports = router;
