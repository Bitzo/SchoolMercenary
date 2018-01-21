const config = {
  salt: '5tackf4rml3z0',
  secret: '5tackf4rml3z0',
  pageCount: 20,
  // mysql config
  port: 3001,
  mysql: {
    host: '115.159.201.83',
    port: 3306,
    user: 'xyyb',
    password: 'stackfarm1320',
    database: 'schoolMercenary',
  },
  // SMS API
  smsConfig: {
    appID: '',
    accountSid: '',
    authToken: '',
    restUrl: '',
  },
};

module.exports = config;
