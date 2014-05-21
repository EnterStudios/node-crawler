var cheerio = require('cheerio');
var http = require('http');
var https = require('https');
var urls = require('url');

function download(url, callback){
  function get_data(res){
      var data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on("end", function() {
        callback(data);
      });
  }

  if (urls.parse(url).protocol == 'https:') {
    https.get(url, get_data).on("error", function() {
      callback(null);
    });
  }
  else {
    http.get(url, get_data).on("error", function() {
      callback(null);
    });
  }
}

function parseTweets(data, callback){
  var tweets = [];
  $ = cheerio.load(data);

  $('.js-tweet-text').each(function(i, elem) {
    tweets[i] = $(this).text();
  });
  callback(tweets); 
}

function parseNews(data, callback){
  var news = [];
  $ = cheerio.load(data);

  $('.post').each(function(i, elem) {
    var title = $(this).children('h1').text();
    var date = $(this).children('h2').first().text();
    var text = $(this).children('p').text();
    if (i !== 0) {
      var post = {
          title: title,
          date: date,
          text: text 
      };
      news.push(post);
    }
  });
  callback(news); 
}

exports.getNews = function getNews(url, callback){
  download(url, function(data){
    if (data) {
      parseNews(data, function(data){
        callback(data);
      });
    }
    else console.log("Error downloading news");
  });
};

exports.getTweets = function getTweets(url, callback){
  download(url, function(data){
    if (data) {
      parseTweets(data, function(data){
        callback(data);
      });
    }
    else console.log("Error downloading tweets");
  });
};
