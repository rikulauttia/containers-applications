const { getAsync, setAsync } = require("./redis");

async function testRedis() {
  console.log("🔍 Checking Redis connection...");

  await setAsync("debug_test_key", "Redis is working!");
  console.log("✅ Successfully wrote to Redis!");

  const value = await getAsync("debug_test_key");
  console.log("🔍 Retrieved from Redis:", value);
}

testRedis();
