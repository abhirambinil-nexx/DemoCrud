import student from "../models/student.model.js";
import { Op } from "sequelize";

async function createStudent(data) {
  return await student.create(data);
}
async function getStudent() {
  return await student.findAll();
}
async function updateStudent(data, id) {
  return await student.update(data, { where: { id } });
}
async function deleteStudent(id) {
  return await student.destroy({ where: { id } });
}

async function listStudent(limit, offset) {
  return await student.findAndCountAll({ limit, offset });
}

async function getStudentById(id) {
  return await student.findOne({ where: { id } });
}

async function createbulkStudent(data) {
  return await student.bulkCreate(data);
}

async function getbulkStudent(startId, endId) {
  return await student.findAll({
    where: {
      id: {
        [Op.between]: [startId, endId],
      },
    },
  });
}

async function updatebulkStudent(data, startId, endId) {
  return await student.update(data, {
    where: {
      id: {
        [Op.between]: [startId, endId],
      },
    },
  });
}

async function deletebulkStudent(startId, endId) {
  return await student.destroy({
    where: {
      id: {
        [Op.between]: [startId, endId],
      },
    },
  });
}

export {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  listStudent,
  getStudentById,
  createbulkStudent,
  getbulkStudent,
  updatebulkStudent,
  deletebulkStudent,
};
