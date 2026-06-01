import express from "express";

import {
  createAttendance,
  getAllAttendance,
  getOneAttendance,
  updateOneAttendance,
  deleteOneAttendance,
} from "../controller/attendance.controller.js";

const attendence_router = express.Router();

attendence_router.post("/attendance", createAttendance);
attendence_router.get("/attendance", getAllAttendance);
attendence_router.get("/attendance/:studentId", getOneAttendance);
attendence_router.patch("/attendance/:studentId", updateOneAttendance);
attendence_router.delete("/attendance/:studentId/:date", deleteOneAttendance);

export default attendence_router;
