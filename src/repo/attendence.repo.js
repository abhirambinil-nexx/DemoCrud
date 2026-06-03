//imports
import Attendance from "../models/attendence.model.js";
// Sequelize functions for attendance management
// Create attendance
async function markAttendance(data) {
  return await Attendance.create(data);
}
// get all attendance
async function getAttendance() {
  return await Attendance.findAll();
}
// get attendance by student id
async function getAttendanceByStudentId(studentId) {
  return await Attendance.findAll({
    where: {
      student_id: studentId,
    },
  });
}
// update attendance
async function updateAttendance(studentId, data) {
  return await Attendance.update(data, {
    where: {
      student_id: studentId,
    },
  });
}
//  delete attendance
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
