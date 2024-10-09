import { db } from "../config/db.js";
import {
  Appointment,
  Avail,
  Client,
  Course,
  Instructor,
} from "../models/index.js";


  // async function getInstructorAvails() {
  // const instructor = "strode" 
  // if (instructor === "ripley") {
  //   const allAvails = await Avail.findAll({ where: {ripley: true}});
  //   console.log(allAvails)
  // }
  // }

  // getInstructorAvails()
// Make call to get ALL Instructors
// app.get("/api/instructor-list", async (req, res) => {
//   const allInstructors = await Instructor.findAll()
  
//   res.json(allInstructors)
// })