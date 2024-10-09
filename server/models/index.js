import Appointment from "./appointment.js";
import { Avail } from "./avail.js";
import Client from "./client.js";
import Instructor from "./instructor.js";
import Course from "./course.js";

Instructor.hasMany(Course, { foreignKey: "instructorId" });
Course.belongsTo(Instructor, { foreignKey: "instructorId" });

// Define many-to-many relationship
Instructor.belongsToMany(Avail, {
  through: Appointment,
  foreignKey: { name: "instructorId", field: "instructor_id" },
});
Avail.belongsToMany(Instructor, {
  through: Appointment,
  foreignKey: { name: "availId", field: "avail_id" },
});

Client.belongsToMany(Avail, {
  through: Appointment,
  foreignKey: { name: "clientId", field: "client_id" },
});
Avail.belongsToMany(Client, {
  through: Appointment,
  foreignKey: { name: "availId", field: "avail_id" },
});

Course.hasMany(Appointment, { foreignKey: "courseId" });
Appointment.belongsTo(Course, { foreignKey: "courseId" })

export { Appointment, Avail, Client, Course, Instructor };
