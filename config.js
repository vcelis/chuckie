var config = {
  userName: 'Chuckie',
  realName: 'nodeJS Chuck Norris IRC bot',
  server: "irc.freenode.net",
  port: 6667,
  debug: false,
  showErrors: false,
  autoRejoin: true,
  autoConnect: true,
  channels: ['#chuckie'],
  secure: false,
  selfSigned: false,
  certExpired: false,
  floodProtection: false,
  floodProtectionDelay: 1000,
  sasl: false,
  stripColors: false,
  messageSplit: 512,
  retryCount: 10,

  apiHostname: 'api.icndb.com',
  apiPort: 80,
};

exports.config = config;