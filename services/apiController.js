var http = require('http');

function ApiController(host, port) {
  this.config = {
    host: this.hostname,
    port: this.port,
  };
}

ApiController.prototype = {
  callApi: function(host, port, path, method, cb) {
    var apiController = this;

    apiController.config = {
      host: host,
      port: port,
      path: path,
      method: method
    }

    http.request(ApiController.config, function(res) {
      var code = res.statusCode;
      var result = '';

      if ( code === 200 ) {
        res.setEncoding('utf8');

        res.on('data', function(data) {
          result += data;
        });

        res.on('end', function() {
          cb(JSON.parse(result));
        })
      } else {
        cb(code);
      }

    }).end();
  }
};

exports.ApiController = ApiController;