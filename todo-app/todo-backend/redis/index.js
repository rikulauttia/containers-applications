const redis = require("redis");
const { promisify } = require("util");
const { REDIS_URL } = require("../util/config");

console.log("Connecting to Redis at:", REDIS_URL);

let getAsync;
let setAsync;
let client;

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log("No REDIS_URL set, Redis is disabled");
    return null;
  };
  getAsync = redisIsDisabled;
  setAsync = redisIsDisabled;
} else {
  const client = redis.createClient({
    url: REDIS_URL,
  });

  client.on("connect", () => {
    console.log("✅ Connected to Redis");
  });

  client.on("error", (err) => {
    console.error("❌ Redis Error:", err);
  });

  getAsync = promisify(client.get).bind(client);
  setAsync = promisify(client.set).bind(client);
}

module.exports = {
  getAsync,
  setAsync,
  client,
};
