import {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  listStudent,
} from "../repo/student.repo.js";
import client from "../Redis/redis.js";

async function create(req, res) {
  try {
    const data = await createStudent(req.body);

    await client.del("students");

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
    const cachedata = await client.get("students");

    if (cachedata) {
      return res.status(200).json({
        success: true,
        source: "Redis-cache",
        data: JSON.parse(cachedata),
      });
    }

    const data = await getStudent();

    await client.set("students", JSON.stringify(data), {
      EX: 4200,
    });

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

    await client.del("students");
    res.status(200).json({
      success: true,
    });
    await client.del("students");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function del(req, res) {
  try {
    const data = await deleteStudent(req.params.id);
    await client.del("students");
    res.status(200).json({
      success: true,
      data,
    });
    await client.del("students");
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
