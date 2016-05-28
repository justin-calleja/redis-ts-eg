import redis = require('redis');
import repl = require('repl');

let redisClient = redis.createClient();

let replServer = repl.start({
  prompt: '>> '
});

replServer.context.redisClient = redisClient;
