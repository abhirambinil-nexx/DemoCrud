// imports
import { Op } from "sequelize";
import Attendance from "../models/attendence.model.js";
// Sequelize functions for attendance management
// total attendance of a student
async function totalattendance(studentId) {
  try {
    const totalAttendance = await Attendance.count({
      where: {
        student_id: studentId,
        status: "present",
      },
    });

    return {
      studentId,
      total_attendance: totalAttendance,
    };
  } catch (error) {
    throw new Error(
      `Error fetching total attendance for student ${error.message}`,
    );
  }
}

// total attendance of a student for a specific month
async function totalattendanceofmonth(studentId, dateString) {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    const totalAttendance = await Attendance.count({
      where: {
        student_id: studentId,
        status: "present",
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    return {
      studentId,
      year,
      month: month + 1,
      total_attendance: totalAttendance,
    };
  } catch (error) {
    throw new Error(
      `Error fetching total attendance for student ${error.message}`,
    );
  }
}

export { totalattendance, totalattendanceofmonth };
