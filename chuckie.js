var irc = require('irc');
var chuckApi = require('./chuckApi.js');

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
      setTimeout(function() { this.start() }, 2000);
    }
  },

  addListeners: function() {
    var chuckie = this;

    this.client.addListener('message', function(from, to, text, message) {
      var regex = new RegExp('^' + chuckie.config.userName + '[,:\s\\|].*$', 'i');

      if ( to === chuckie.config.userName || text.match(regex) ) {
        chuckie.chuckApi.callApi(function(response) {
          chuckie.client.say(message.args[0], response);
        });
      } 
    });
  }

};

exports.Chuckie = Chuckie;