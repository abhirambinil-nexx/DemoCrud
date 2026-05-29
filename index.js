import express from "express";
import sequelize from "./src/config/db.js";
import student from "./src/models/student.model.js";
import studentRoute from "./src/routes/student.Route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running  Welcome to my server");
});

app.use("/api", studentRoute);

await sequelize.sync({ alter: true });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
