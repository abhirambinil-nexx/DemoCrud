//imports
import { createClient } from "redis";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();
// Create and connect Redis client
const client = createClient({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.on("error", (err) => {
  console.log("Redis server have some error", err);
});
// Connect to Redis
await client.connect();
console.log("Redis clent connected");

export default client;
