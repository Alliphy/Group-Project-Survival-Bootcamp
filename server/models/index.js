import Appointment from "./appointment.js";
import { Avail } from "./avail.js";
import Client from "./client.js";
import Instructor from "./instructor.js";
import Course from "./course.js";

Instructor.hasMany(Course, { foreignKey: "instructorId" });
Course.belongsTo(Instructor, { foreignKey: "instructorId" });

export { Appointment, Avail, Client, Course, Instructor };
