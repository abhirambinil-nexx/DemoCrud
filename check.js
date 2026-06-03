import client from "../config/redis.js";

// BULK CREATE
async function bulkCreateRedis(start, end, students) {
  const key = `students:${start}:${end}`;

  for (const s of students) {
    await client.hSet(key, s.id.toString(), JSON.stringify(s));
  }

  return true;
}

// BULK READ
async function bulkReadRedis(start, end) {
  const key = `students:${start}:${end}`;

  const data = await client.hGetAll(key);

  const result = {};

  for (const id in data) {
    result[id] = JSON.parse(data[id]);
  }

  return result;
}

// BULK UPDATE
async function bulkUpdateRedis(start, end, students) {
  const key = `students:${start}:${end}`;

  for (const s of students) {
    await client.hSet(key, s.id.toString(), JSON.stringify(s));
  }

  return true;
}

// BULK DELETE
async function bulkDeleteRedis(start, end, students) {
  const key = `students:${start}:${end}`;

  for (const s of students) {
    await client.hDel(key, s.id.toString());
  }

  return true;
}

export { bulkCreateRedis, bulkReadRedis, bulkUpdateRedis, bulkDeleteRedis };
