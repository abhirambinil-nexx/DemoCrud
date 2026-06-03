import express from "express";

import {
  createAttendance,
  getAllAttendance,
  getOneAttendance,
  updateOneAttendance,
  deleteOneAttendance,
  getTotalAttendance,
} from "../controller/attendance.controller.js";

import { authentication } from "../Middleware/auth.route.js";

const attendence_router = express.Router();

attendence_router.post(
  "/attendance",
  /* authentication.auth,*/ createAttendance,
);
attendence_router.get(
  "/attendance",
  /*authentication.adminAuth,*/ getAllAttendance,
);
attendence_router.get(
  "/attendance/:studentId",
  authentication.auth,
  getOneAttendance,
);
attendence_router.patch(
  "/attendance/:studentId",
  authentication.auth,
  updateOneAttendance,
);
attendence_router.delete(
  "/attendance/:studentId/:date",
  authentication.adminAuth,
  deleteOneAttendance,
);
attendence_router.get(
  "/attendance/total/:studentId",
  /*authentication.auth,*/ getTotalAttendance,
);
export default attendence_router;
