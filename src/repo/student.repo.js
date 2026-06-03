//imports
import student from "../models/student.model.js";
import { Op } from "sequelize";
//create student
async function createStudent(data) {
  return await student.create(data);
}
//read student
async function getStudent() {
  return await student.findAll();
}
//  update student
async function updateStudent(data, id) {
  return await student.update(data, { where: { id } });
}
// delete student
async function deleteStudent(id) {
  return await student.destroy({ where: { id } });
}
//  list student
async function listStudent(limit, offset) {
  return await student.findAndCountAll({ limit, offset });
}
// get student by id
async function getStudentById(id) {
  return await student.findOne({ where: { id } });
}
// bulk create student
async function createbulkStudent(data) {
  return await student.bulkCreate(data);
}
//  bulk get student
async function getbulkStudent(startId, endId) {
  return await student.findAll({
    where: {
      id: {
        [Op.between]: [startId, endId],
      },
    },
  });
}
// bulk update student
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
