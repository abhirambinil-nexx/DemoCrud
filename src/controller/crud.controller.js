import { createStudent, getStudent } from "../repo/constant.js";

async function create(req, res) {
  try {
    const data = await createStudent(req.body);
    res.status(201).json({
      message: "created successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function get(req, res) {
  try {
    const data = await getStudent();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export { create, get };
