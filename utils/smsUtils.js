const { smsConfig } = require('../config/config');
const axios = require('axios');

async function sendSMS(phoneNumber, code) {
  const options = {
    url: 'https://open.ucpaas.com/ol/sms/sendsms',
    method: 'POST',
    data: {
      sid: smsConfig.accountSid,
      token: smsConfig.authToken,
      appid: smsConfig.appID,
      templateid: '273472',
      param: `${code},3分钟`,
      mobile: phoneNumber,
      uid: '',
    },
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios(options);
    const json = await res.data;
    console.log(json);
    if (json.code === '000000') {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  sendSMS,
};
