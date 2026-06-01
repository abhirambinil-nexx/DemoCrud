import client from "../Redis/redis.js";

async function setAttendance(studentId, date, data) {
  const key = `attend:${studentId}:${date}`;

  await client.hSet(key, {
    status: data.status || null,
    checkin_time: data.checkin_time || null,
    checkout_time: data.checkout_time || null,
  });
  await client.expire({ EX: 86400 });
}

async function getAttendance(studentId, date) {
  const key = `attend:${studentId}:${date}`;

  const data = await client.hGetAll(key);

  if (!data.status) {
    return null;
  }

  return data;
}

async function updateAttendance(studentId, date, field, value) {
  const key = `attend:${studentId}:${date}`;

  await client.hSet(key, field, value);
}

async function deleteAttendance(studentId, date) {
  const key = `attend:${studentId}:${date}`;

  await client.del(key);
}

export { setAttendance, getAttendance, updateAttendance, deleteAttendance };
