import Attendance from "../models/attendence.model.js";

async function markAttendance(data) {
  return await Attendance.create(data);
}

async function getAttendance() {
  return await Attendance.findAll();
}

async function getAttendanceByStudentId(studentId) {
  return await Attendance.findAll({
    where: {
      student_id: studentId,
    },
  });
}

async function updateAttendance(studentId, data) {
  return await Attendance.update(data, {
    where: {
      student_id: studentId,
    },
  });
}

async function deleteAttendance(studentId) {
  return await Attendance.destroy({
    where: {
      student_id: studentId,
    },
  });
}

export {
  markAttendance,
  getAttendance,
  getAttendanceByStudentId,
  updateAttendance,
  deleteAttendance,
};
