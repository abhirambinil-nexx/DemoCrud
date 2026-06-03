// imports
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import sequelize from "./src/config/db.js";
import student from "./src/models/student.model.js";
import studentRoute from "./src/routes/student.Route.js";
import Attendance from "./src/models/attendence.model.js";
import attendanceRoute from "./src/routes/attendence.Route.js";
// Load environment variables
dotenv.config();
// Create Express app
const app = express();
const secret = process.env.SECRET_KEY || "default_secret_key";
// Middleware
app.use(express.json());
// Test route
app.get("/", (req, res) => {
  res.send("Server Running  Welcome to my server");
});
// Route to generate JWT token for testing
app.get("/api/token", (req, res) => {
  const token = jwt.sign({ id: 1, email: "test@example.com" }, secret, {
    expiresIn: "1h",
  });

  res.json({
    success: true,
    token,
    message: "Use this token with Authorization: Bearer <token>",
  });
});
// Use routes
app.use("/api", studentRoute);
app.use("/api/attend", attendanceRoute);
// Sync database and start server
await sequelize.sync({ alter: true });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
