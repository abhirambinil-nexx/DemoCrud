import { Sequelize } from "sequelize";

const sequelize = new Sequelize("student_db", "dev", "abhiram@2008", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
