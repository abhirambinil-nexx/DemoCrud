import express from "express";
import sequelize from "./src/config/db.js";
import student from "./src/models/studentmodel.js";
import studentRoute from "./src/routes/studentRoute.js";
import { createStudent, getStudent } from "./src/repo/constant.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running  Welcome to my server");
});

app.use("/api", studentRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
