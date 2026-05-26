import express from "express";
import { create, get, update, del } from "../controller/crud.controller.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Welcome to my server");
});

router.post("/student", create);
router.get("/student/get", get);
router.patch("/student/update/:id", update);
router.delete("/student/delete/:id", del);
export default router;
