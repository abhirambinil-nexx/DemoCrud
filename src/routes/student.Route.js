import express from "express";
import {
  create,
  read,
  update,
  del,
  get,
  getbyId,
  bulkcreate,
  bulkdelete,
  bulkupdate,
  
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
router.get("/student/getid/:id", getbyId);
router.post("/student/multicreate", bulkcreate);
router.patch("/student/multiupdate/:startId/:endId", bulkupdate);
router.delete("/student/multidelete/:startId/:endId", bulkdelete);


export default router;
