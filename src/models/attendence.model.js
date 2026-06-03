//imports
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import student from "./student.model.js";
// Define the Attendance model
const Attendance = sequelize.define(
  "attendances",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: student,
        key: "id",
      },
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    checkin_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },

    checkout_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["student_id", "date"],
      },
    ],
  },
);

export default Attendance;
