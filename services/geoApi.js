var http = require('http');

function GeoApi(config) {
  this.config = {
    host: config.geoApiHostname,
    port: config.geoApiPort,
    path: '',
    method: 'GET'
  }
}

GeoApi.prototype = {
  callApi: function(target, cb) {
    var geoApi = this;

    geoApi.config.path += target;

    http.request(chuckApi.config, function(res) {
      var code = res.statusCode;
      var result = '';
      code = res.statusCode
    });
  }
};

exports.GeoApi = GeoApi;