import student from "../models/studentmodel.js";

async function createStudent(data) {
  return await student.create(data);
}
async function getStudent() {
  return await student.findAll();
}

export { createStudent, getStudent };
