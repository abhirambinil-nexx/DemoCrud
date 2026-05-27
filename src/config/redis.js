import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWD,
  socket: {
    host: process.env.REIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.on("error", (err) => {
  console.log("Redis server have some error", err);
});

await client.connect();
console.log("Redis clent connected");

export default client;
