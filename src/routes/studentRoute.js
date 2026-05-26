import express from "express";
import {
  create,
  read,
  update,
  del,
  get,
} from "../controller/crud.controller.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Welcome to my server");
});

router.post("/student", create);
router.get("/student/read", read);
router.patch("/student/update/:id", update);
router.delete("/student/delete/:id", del);
router.get("/student/get/", get);

export default router;
