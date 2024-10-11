import Sequelize from "sequelize";
import { db } from "../config/db.js";

const Appointment = db.define("Appointment", {
  appointmentId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Sequelize.DataTypes.DATEONLY,
  },
  instructorId: {
    type: Sequelize.DataTypes.INTEGER,
  },
  clientId: {
    type: Sequelize.DataTypes.INTEGER,
  },
  courseId: {
    type: Sequelize.DataTypes.INTEGER,
  },
});

export default Appointment;
