import {
  markAttendance,
  getAttendance,
  getAttendanceByStudentId,
  updateAttendance,
  deleteAttendance,
} from "../repo/attendence.repo.js";

import { totalattendance } from "../service/sequelize.query.js";

import {
  setAttendance,
  deleteAttendance as deleteRedisAttendance,
} from "../repo/attendance.redis.repo.js";

async function createAttendance(req, res) {
  try {
    const data = req.body;

    const result = await markAttendance(data);

    await setAttendance(data);

    res.status(201).json({
      success: true,
      message: "Attendance created",
      data: result,
    });
  } catch (err) {
    console.log(err.errors);

    res.status(500).json({
      success: false,
      message: err.message,
      errors: err.errors?.map((error) => error.message),
    });
  }
}

async function getAllAttendance(req, res) {
  try {
    const data = await getAttendance();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getOneAttendance(req, res) {
  try {
    const { studentId } = req.params;
    const data = await getAttendanceByStudentId(studentId);

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    for (const attendance of data) {
      await setAttendance(attendance);
    }

    res.status(200).json({
      success: true,
      message: "Attendance saved in redis",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateOneAttendance(req, res) {
  try {
    const { studentId } = req.params;
    const data = {
      ...req.body,
      student_id: studentId,
    };
    await updateAttendance(studentId, data);

    await setAttendance(data);

    res.status(200).json({
      success: true,
      message: "Attendance updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function deleteOneAttendance(req, res) {
  try {
    const { studentId, date } = req.params;
    await deleteRedisAttendance(studentId, date);

    await deleteAttendance(studentId);
    res.status(200).json({
      success: true,
      message: "Attendance deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getTotalAttendance(req, res) {
  try {
    const { studentId } = req.params;
    const data = await totalattendance(studentId);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
export {
  createAttendance,
  getAllAttendance,
  getOneAttendance,
  updateOneAttendance,
  deleteOneAttendance,
  getTotalAttendance,
};
