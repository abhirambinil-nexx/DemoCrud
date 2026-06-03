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

import { authentication } from "../Middleware/auth.route.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Welcome to my server");
});

router.post("/student", authentication.adminAuth, create);
router.get("/student/read", authentication.auth, read);
router.patch("/student/update/:id", authentication.adminAuth, update);
router.delete("/student/delete/:id", authentication.adminAuth, del);
router.get("/student/get/", authentication.auth, get);
router.get("/student/getid/:id", authentication.auth, getbyId);
router.post("/student/multicreate", authentication.adminAuth, bulkcreate);
router.patch("/student/multiupdate/:startId/:endId", authentication.adminAuth, bulkupdate);
router.delete("/student/multidelete/:startId/:endId", authentication.adminAuth, bulkdelete);


export default router;
