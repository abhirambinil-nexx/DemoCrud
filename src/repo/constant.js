import stud from "../models/studentmodel.js";

async function createStudent(data) {
  return await stud.create(data);
}
async function getStudent() {
  return await stud.findAll();
}

export { createStudent, getStudent };
