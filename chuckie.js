var irc = require('irc');

var chuckApi = require('./services/chuckApi.js');
var geoApi = require('./services/geoApi.js');
var weatherApi = require('./services/weatherApi.js');

Chuckie.QUESTIONS = ['Yes', 'No', 'Maybe', 'Yeap', '?', 'How should I know?'];

function Chuckie(config) {
  this.config = config;
  this.client = new irc.Client(this.config.server, this.config.userName, this.config);
  this.chuckApi = new chuckApi.ChuckApi(config);
}

Chuckie.prototype = {

  start: function() {
    var chuckie = this;

    console.log('Bot is starting');
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
      setTimeout(function() { this.start() }, 5000);
    }
  },

  evalMessage: function(from, to, text, message, responseTo) {
    var chuckie = this;

    if (text.match(/.*joke.*/)) {
      chuckie.chuckApi.call(from, function(response) {
        chuckie.client.say(responseTo, response);
      });
    } else if (text.match(/^.*location.*$/)) {
      chuckie.client.say(responseTo, 'LOCATION');
    } else if (text.match(/^.*weather.*$/)) {
      chuckie.client.say(responseTo, 'WEATHER');
    } else if (text.match(/^.*\?$/)) {
      var i = Math.floor((Math.random() * Chuckie.QUESTIONS.length));
      chuckie.client.say(responseTo, Chuckie.QUESTIONS[i]);
    } else {
      chuckie.client.say(responseTo, 'I don\'t understand');
    }
  },

  addListeners: function() {
    var chuckie = this;

    this.client.addListener('message', function(from, to, text, message) {
      var regex = new RegExp('^' + chuckie.config.userName + '[,:\s\\|].*$', 'i');
      var pm = to === chuckie.config.userName;
      var responseTo = pm ? from : message.args[0];

      if ( pm || text.match(regex) ) {
        chuckie.evalMessage(from, to, text, message, responseTo);
        /*
        chuckie.chuckApi.callApi(from, function(response) {
          chuckie.client.say(responseTo, response);
        });
        */
      } 
    });
  }

};

exports.Chuckie = Chuckie;