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
});

export default Appointment;
