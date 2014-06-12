var http = require('http');

function ChuckApi(config) {
  this.config = {
      host: config.apiHostname,
      port: config.apiPort,
      path: '/jokes/random',
      method: 'GET'
  };
}

ChuckApi.prototype = {
  callApi: function(from, cb) {
    var chuckApi = this;

    chuckApi.config.path += '?firstName=Shibe&lastName=' + from;
    console.log(chuckApi.config.path);

    http.request(chuckApi.config, function(res) {
      var code = res.statusCode;
      var result = '';
      code = res.statusCode;

      if ( code === 200 ) {
        res.setEncoding('utf8');
        
        res.on('data', function(data) {
          result += data;
        });
        
        res.on('end', function() {
          cb(JSON.parse(result).value.joke);
        });
      }

    }).end();
  }
};

exports.ChuckApi = ChuckApi;