//imports
import client from "../Redis/redis.js";
// Redis functions for attendance management
// set attendance
async function setAttendance(data) {
  const studentId = data.student_id;
  const date = data.date;
  const key = `attend:${studentId}:${date}`;

  await client.hSet(key, {
    status: data.status,
    checkin_time: data.checkin_time,
    checkout_time: data.checkout_time,
  });
  await client.expire(key, 24 * 60 * 60);
}
// get attendance
async function getAttendance(studentId, date) {
  const key = `attend:${studentId}:${date}`;

  const data = await client.hGetAll(key);

  if (!data.status) {
    return null;
  }

  return data;
}
// update attendance
async function updateAttendance(studentId, date, field, value) {
  const key = `attend:${studentId}:${date}`;

  await client.hSet(key, field, value);
}
// delete attendance
async function deleteAttendance(studentId, date) {
  const key = `attend:${studentId}:${date}`;

  await client.del(key);
}

export { setAttendance, getAttendance, updateAttendance, deleteAttendance };
