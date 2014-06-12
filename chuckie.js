var http = require('http');
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


var irc = require('irc');

function Chuckie(config) {
  this.config = config;
  this.client = new irc.Client(this.config.server, this.config.userName, this.config);
}

Chuckie.prototype.addListeners = function() {
  var chuckie = this;
  this.client.addListener('message', function(from, to, text, message) {
    var regex = new RegExp('^' + chuckie.config.userName + '[,:\s\\|].*$', 'i');

    if ( to === chuckie.config.userName || text.match(regex) ) {
      chuckie.client.say(message.args[0], 'something funny here');
    } 
  });
}

Chuckie.prototype.start = function() {
  var chuckie = this;
  console.log('Connecting to IRC...');
  try {
    chuckie.client.connect(10);
    console.log('Succesfully connected!');
    chuckie.addListeners();
    console.log('Succesfully added listeners');
  } catch (ex) {
    console.log('Some error occured while connecting:');
    console.log(ex);
    console.log('-------------------------------------');
    console.log('Retry in 5 seconds');
    setTimeout(function() { this.start() }, 2000);
  }
}

exports.Chuckie = Chuckie;