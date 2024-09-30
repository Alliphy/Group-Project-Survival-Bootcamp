import Sequelize from "sequelize";
import { db } from "../config/db.js";

export const Avail = db.define("Avail", {
  date: {
    type: Sequelize.DataTypes.DATEONLY,
    primaryKey: true,
    unique: true,
  },
  ripley: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
  strode: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
  williams: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
  warrens: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
  washington: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
  asakawa: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
