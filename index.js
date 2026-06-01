import express from "express";
import sequelize from "./src/config/db.js";
import student from "./src/models/student.model.js";
import studentRoute from "./src/routes/student.Route.js";
import Attendance from "./src/models/attendence.model.js";
import attendanceRoute from "./src/routes/attendence.Route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running  Welcome to my server");
});

app.use("/api", studentRoute);
app.use("/api/attend", attendanceRoute);

await sequelize.sync({ alter: true });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
