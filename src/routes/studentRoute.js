import express from "express";
import {create,get} from "../controller/crud.controller.js";

const router = express.Router();
router.get("/",(req,res)=>{
    res.send("Welcome to my server");
});

router.post("/student",create);
router.get("/student/get",get);

export default router;