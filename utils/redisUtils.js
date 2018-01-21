const Redis = require('ioredis');
const { Store } = require('koa-session2');
const config = require('../config/config').redis;

class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis(config);
  }

  async get(sid) {
    const data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }

  async set(session, { sid = this.getID(24), maxAge = 180000 } = {}) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
    } catch (e) {
      console.log(e);
    }
    return sid;
  }

  async destroy(sid) {
    const result = await this.redis.del(`SESSION:${sid}`);
    return result;
  }
}

module.exports = RedisStore;
