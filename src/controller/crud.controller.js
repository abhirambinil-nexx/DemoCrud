import {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  listStudent,
  getStudentById,
  createbulkStudent,
  updatebulkStudent,
  deletebulkStudent,
} from "../repo/student.repo.js";

import {
  getInBulk,
  getcache,
  setcache,
  deletecache,
  updatecache,
  getTTL,
  // lst,
} from "../repo/redis.repo.js";

import client from "../Redis/redis.js";

async function create(req, res) {
  try {
    const data = await createStudent(req.body);
    await setcache(`user:${data.id}`, data, 60);

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
    const cachedata = await getcache(`user:${req.params.id}`);
    if (cachedata) {
      return res.status(200).json({
        success: true,
        source: "Redis-cache",
        data: JSON.parse(cachedata),
      });
    }

    const data = await getStudent();

    await setcache(data, 4200);

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
    const id = parseInt(req.params.id);
    const updatedCount = await updateStudent(req.body, id);

    if (updatedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "student not found",
      });
    }

    const data = await getStudentById(id);
    await updatecache(`user:${id}`, data, 60);

    res.status(200).json({
      success: true,
      message: "updated successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function del(req, res) {
  try {
    const data = await deleteStudent(req.params.id);
    await deletecache(`user:${req.params.id}`);
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
    // const cacheKey = `user${id}`;

    // const cacheData = await lst(cacheKey,limit,offset);

    // if (cacheData) {
    //   return res.status(200).json({
    //     success: true,
    //     source: "Redis-cache",
    //     ...JSON.parse(cacheData),
    //   });
    // }
    
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

async function getbyId(req, res) {
  try {
    const id = parseInt(req.params.id);
    const cachedata = await getcache(`user:${id}`);
    if (cachedata) {
      return res.status(200).json({
        success: true,
        source: "Redis-cache",
        data: JSON.parse(cachedata),
      });
    }
    
    const data = await getStudentById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "student not found",
      });
    }

    await setcache(`user:${id}`, data, 4200);
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
async function bulkcreate(req, res) {
  try {
    const start = parseInt(req.params.startId);
    const end = parseInt(req.params.endId);

    const cachedata = await client.get("students");
    const students = JSON.parse(cachedata);

    const filtered = students.filter(
      (student) => student.id >= start && student.id <= end,
    );

    const data = await createbulkStudent(req.body, start, end);
    res.status(201).json({
      message: "created successfully",
      success: true,
      startId: start,
      endId: end,
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
      startId: req.params.startId,
      endId: req.params.endId,
    });
  }
}

async function bulkupdate(req, res) {
  try {
    const start = parseInt(req.params.startId);
    const end = parseInt(req.params.endId);
    const cachedata = await client.get("students");
    const students = JSON.parse(cachedata);

    const filtered = student.filter(
      (student) => studen.id >= start && student.id <= end,
    );
    const data = await updatebulkStudent(req.body, start, end);
    res.status(200).json({
      message: "updated successfully",
      success: true,
      startId: start,
      endId: end,
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
      startId: req.params.startId,
      endId: req.params.endId,
      data,
    });
  }
}

async function bulkdelete(req, res) {
  try {
    const start = parseInt(req.params.startId);
    const end = parseInt(req.params.endId);

    const cachedata = await client.get("students");
    const students = JSON.parse(cachedata);

    const filtered = student.filter(
      (student) => student.id >= start && student.id <= end,
    );

    const data = await deletebulkStudent(start, end);
    res.status(200).json({
      message: "deleted successfully",
      success: true,
      startId: start,
      endId: end,
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      succes: false,
      startId: req.params.startId,
      endId: req.params.endId,
    });
  }
}
export {
  create,
  read,
  update,
  del,
  get,
  getbyId,
  bulkcreate,
  bulkdelete,
  bulkupdate,
};
