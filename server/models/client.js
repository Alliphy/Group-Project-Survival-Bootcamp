import Sequelize from "sequelize";
import { db } from "../config/db.js"

const Client = db.define('Client', {
    email: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    firstName: {
        type: Sequelize.DataTypes.STRING
    },
    lastName: {
        type: Sequelize.DataTypes.STRING
    },
    instructor: {
        type: Sequelize.DataTypes.STRING
    },
})

export default Client;