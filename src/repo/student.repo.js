import student from "../models/student.model.js";

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

export { createStudent, getStudent, updateStudent, deleteStudent, listStudent };
