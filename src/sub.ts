import redis = require('redis');

let redisClient = redis.createClient();

let defaultChannel = 'helloChannel';
let args = process.argv.slice(2);
let channelName: string = args[0] || defaultChannel;

function subscribe(redisClient, channelName) {
  redisClient.subscribe(channelName, (err, channel) => {
    if (err) throw err;
    console.log(`now listening on channel: '${channelName}'`);
  });
}

redisClient.on('error', console.error);

redisClient.on('message', (channelName, msg: String) => {
  console.log(`${channelName}: ${msg}`);
  if (msg === '/unsubscribe') {
    redisClient.unsubscribe(channelName);
  } else if (msg.startsWith('/subscribe')) {
    let channel = msg.split(' ').slice(1).join(' ');
    subscribe(redisClient, channel);
  }
});

redisClient.on('unsubscribe', (channelName, count) => {
  console.log(`unsubscribing from ${channelName}. Client is now listening to ${count} channel(s)`);
  if (count === 0) {
    console.log('no more subscriptions; exiting…');
    process.exit();
  }
});

redisClient.on('subscribe', (channelName, count) => {
  console.log(`listening on channel: ${channelName}. Client is now listening to ${count} channel(s)`);
});

subscribe(redisClient, channelName);
