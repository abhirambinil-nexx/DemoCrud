import { createStudent, getStudent, updateStudent, deleteStudent} from "../repo/constant.js";

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
    res.status(200).json({
      success: true,
      totalStudentsDetails: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function update(req, res) {
  try {
    const data = await updateStudent(req.body, req.params.id);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status().json({
      message: err.message,
    });
  }
}

async function del(req, res) {
  try {
    const data = await deleteStudent(req.params.id);
    res.status(200).json({
      success: true,

      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export { create, get, update, del };
