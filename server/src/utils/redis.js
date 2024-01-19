const redis = require('redis');
const client = redis.createClient();

client.connect();

client.on("error", (err) => {
  console.error("Error occurred:", err);
});

module.exports = client