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
  callApi: function(cb) {
    var chuckApi = this;

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
          cb(JSON.parse(result).value.joke.replace("&quot;", "\"").replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">"));
        });
      }

    }).end();
  }
};

exports.ChuckApi = ChuckApi;
