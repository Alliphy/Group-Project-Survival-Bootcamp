import Sequelize from "sequelize";
import { db } from "../config/db.js";

const Course = db.define("Course", {
  courseId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
  },
  description: {
    type: Sequelize.DataTypes.STRING,
  },
  instructorId: {
    type: Sequelize.DataTypes.INTEGER,
  },
  price: {
    type: Sequelize.DataTypes.INTEGER,
  },
});

export default Course;
