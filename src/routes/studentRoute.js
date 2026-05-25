import express from "express";
import {create,get} from "../controller/crud.controller.js";

const router = express.Router();

router.post("/student",create).get("/student",get);

export default router;