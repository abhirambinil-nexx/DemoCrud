import {
  markAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from "../repo/attendence.repo.js";

import { setAttendance } from "../repo/attendance.redis.repo.js";

async function createAttendance(req, res) {
  try {
    const data = req.body;

    const result = await markAttendance(data);

    await setAttendance(data.student_id, data.date, data);

    res.status(201).json({
      success: true,
      message: "Attendance created",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
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
    const { id } = req.params;

    const data = await getAttendanceById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

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

async function updateOneAttendance(req, res) {
  try {
    const { id } = req.params;

    const data = req.body;

    await updateAttendance(id, data);

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
    const { id } = req.params;

    await deleteAttendance(id);

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

export {
  createAttendance,
  getAllAttendance,
  getOneAttendance,
  updateOneAttendance,
  deleteOneAttendance,
};
