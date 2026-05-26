import {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  listStudent,
} from "../repo/constant.js";

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

async function read(req, res) {
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

async function get(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    let offset;
    if (req.query.offset) {
      offset = parseInt(req.query.offset);
    } else {
      offset = (page - 1) * limit;
    }
    const { count, rows } = await listStudent(limit, offset);

    res.status(200).json({
      success: true,
      totalStudentsDDetails: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export { create, read, update, del, get };
