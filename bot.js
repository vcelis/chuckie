var chuckie = require('./chuckie.js');
var config = require('./config.js');

var bot = new chuckie.Chuckie(config.config);
bot.start();