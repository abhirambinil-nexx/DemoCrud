import Attendance from "../models/attendence.model.js";

async function markAttendance(data) {
  return await Attendance.create(data);
}

async function getAttendance() {
  return await Attendance.findAll();
}

async function getAttendanceById(id) {
  return await Attendance.findByPk(id);
}

async function updateAttendance(id, data) {
  return await Attendance.update(data, {
    where: {
      id,
    },
  });
}

async function deleteAttendance(id) {
  return await Attendance.destroy({
    where: {
      id,
    },
  });
}

export {
  markAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
