import Attendance from "../models/attendence.model.js";

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

export { totalattendance };
