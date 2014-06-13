var ApiController = require('./apiController.js');

function ChuckApi(config) {
  this.apiController = ApiController.create(config.chuckApiHostname, config.chuckApiPort);
}


ChuckApi.prototype = {
  call: function(from, cb) {
    var chuckApi = this;

    var path = chuckApi.config.path + '?firstName=Shibe&lastName=' + from;

    chuckApi.callApi(path, 'GET', function(res) {
      if (res.constructor === objectConstructor) {
        cb(res.value.joke.replace(/&quot;/g, "\"").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
      } else {
        cb('Hmm... Looks like troubles in the cloud. CODE ' + res);
      }
    });
  }
};

exports.ChuckApi = ChuckApi;