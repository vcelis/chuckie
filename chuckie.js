var callApi = function(path, callback) {
  var options = {
    host: 'api.icndb.com',
    port: 80,
    path: path,
    method: 'GET'
  };
  http.request(options, function(res) {
    var code = res.statusCode;
    var result = '';
    code = res.statusCode;
    if ( code === 200 ) {
      res.setEncoding('utf8');
      res.on('data', function(data) {
        result += data;
      });
      res.on('end', function() {
        callback(JSON.parse(result));
      });
    }
  }).end();
};

var getJoke = function() {
  callApi('/jokes/random', function(joke) {
    return joke.value.joke;
  });
};




var http = require('http')
var irc = require('irc');
var config = require('./config.js');

function Chuckie() {
  this.client = new irc.Client(config.server, config.userName, config);
}

Chuckie.prototype.addListeners = function() {
  this.client.addListener('message', function(from, to, text, message) {
    var regex = new RegExp('^' + config.userName + '[,:\s\\|].*$', 'i');

    if ( to === config.userName || text.match(regex) ) {
      callApi('/jokes/random', function(client, joke) {
        client.say(joke.value.joke);
      });
    } 
  });
};

Chuckie.prototype.start = function() {
  console.log('Connecting to IRC...');
  this.addListeners();
};

exports.Chuckie = Chuckie;