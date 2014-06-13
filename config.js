var config = {
  userName: 'ChuckieDev',
  realName: 'nodeJS Chuck Norris IRC bot',
  server: 'irc.freenode.net',
  port: 6667,
  debug: false,
  showErrors: false,
  autoRejoin: true,
  autoConnect: false,
  channels: ['#dogecoin-bots'],
  secure: false,
  selfSigned: false,
  certExpired: false,
  floodProtection: false,
  floodProtectionDelay: 1000,
  sasl: false,
  stripColors: false,
  messageSplit: 512,
  retryCount: 10,

  chuckApiHostname: 'api.icndb.com',
  apiApiPort: 80,
  geoApiHostname: 'ip-api.com/json/',
  geoApiPort: 80
};

exports.config = config;