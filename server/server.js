import express from "express";
import process from "process";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import "dotenv/config";
import {
  Appointment,
  Avail,
  Client,
  Course,
  Instructor,
} from "./models/index.js";
import cors from "cors";
import { Op } from "sequelize";

const app = express();
const PORT = process.env.PORT || 5090;

ViteExpress.config({
  printViteDevServerHost: true,
});

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 10 * 1000 * 60 }, // Session expires after 10 minutes of inactivity
    saveUninitialized: true,
    resave: false,
  })
);
app.use(cors());

// Gets all "true" availabilities for selected Instructor
app.post("/api/instructor-avails", async (req, res) => {
  const { instructor } = req.body;
  // console.log("Req.body for instructor avails: ", req.body);

  let whereClause = {};

  switch (instructor) {
    case "Ripley":
      whereClause = { ripley: true };
      break;
    case "Strode":
      whereClause = { strode: true };
      break;
    case "Williams":
      whereClause = { williams: true };
      break;
    case "Warren":
      whereClause = { warrens: true };
      break;
    case "Washington":
      whereClause = { washington: true };
      break;
    case "Asakawa":
      whereClause = { asakawa: true };
      break;
    default:
      console.log(`No instructors found under ${instructor}`);
      return res.status(404).json({ message: "Instructor not found" });
  }

  // Finds dates where selected instructor is available
  const allAvails = await Avail.findAll({
    // attributes: ["date"],
    where: whereClause,
  });
  const parsedAvails = allAvails.map((avail) => avail.dataValues.date);
  res.json(parsedAvails);
});

//Make call to get single instructor
app.get("/api/current-instructor"),
  async (req, res) => {
    const currentInstructor = await Instructor.findOne({
      attributes: ["instructor_id", "firstName", "lastName", "email"],
    });
    res.json(currentInstructor);
  };

// Make call to get ALL Instructors
app.get("/api/instructor-list", async (req, res) => {
  const allInstructors = await Instructor.findAll({
    attributes: ["instructor_id", "firstName", "lastName", "email"],
  });
  res.json(allInstructors);
});

// Endpoint for getting ALL courses
app.get("/api/all-courses", async (req, res) => {
  const allCourses = await Course.findAll({
    attributes: ["courseId", "title", "instructorId"],
  });
  res.json(allCourses);
});

app.get("/api/instructor-course/:instructorId", async (req, res) => {
  const userId = req.params.instructorId;

  const courses = await Course.findAll({
    where: { instructorId: userId },
  });
  res.json(courses);
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    let user;
    const foundUser = await Client.findOne({ where: { email } });

    if (!foundUser) {
      user = await Instructor.findOne({ where: { email } });
    } else {
      user = foundUser;
    }

    console.log(user);

    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    if (user.password !== password) {
      return res.status(401).send("Unauthorized");
    }

    const userKeys = Object.keys(user.dataValues);
    // console.log(userKeys);
    if (userKeys.includes("instructorId")) {
      req.session.instructor = true;
      console.log("Hit isInstructor");
    }

    req.session.logged_in = true;
    req.session.user = {
      userId: user.clientId || user.instructorId,
      email: user.email,
      password: user.password,
    };

    return res.json({
      user: user,
      message: "You are now logged in!",
      success: true,
      session: req.session,
    });
  } catch (e) {
    console.log("hit catch");
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const foundUser = await Client.findOne({ where: { email } });
  if (foundUser) {
    return res.status(400).send("Email already exists");
  }
  await Client.create({
    email,
    password,
    firstName,
    lastName,
  });

  return res.send("user created");
});

// Custom route middleware function that checks if the user is logged in.
function loginRequired(req, res, next) {
  // console.log("session", req.session); // Log session for debugging

  // Check if user is logged in by checking if the user ID exists in the session
  if (!req?.session?.user?.instructorId || !req?.session?.user?.clientId) {
    // Send 401 Unauthorized response if not logged in
    res.status(401).json({ error: "Unauthorized", from: "middleware" });
  } else {
    next(); // Call the next middleware if user is logged in
  }
}
// Note the `loginRequired` argument passed to the routes below!

app.post("/api/create-appointment", async (req, res) => {
  const { date, instructor_id, client_id, course_id } = req.body;
  const avail = await Avail.findOne({
    where: { date: date },
  });
  switch (instructor_id) {
    case 1:
      avail.ripley = false
      await avail.save()
      break;
    case 2:
      avail.strode = false
      await avail.save()
      break;
    case 3:
      avail.williams = false
      await avail.save()
      break;
    case 4:
      avail.warrens = false
      await avail.save()
      break;
    case 5:
      avail.washington = false
      await avail.save()
      break;
    case 6:
      avail.asakawa = false
      await avail.save()
      break;
    default:
      console.log(`No instructors found under ${instructor_id}`);
  }

  await Appointment.create({
    date: date,
    instructorId: instructor_id,
    clientId: client_id,
    courseId: course_id,
  });

  console.log("updated record:", avail);
  return res.send("appointment created");
});

app.post("/api/logout", (req, res) => {
  console.log("hit logout");
  // Destroy the user session
  req.session.destroy();
  // Send a success response
  res.json({ success: true });
});

app.get("/api/my-appointments", async (req, res) => {
  const userId = req.session.user;
  console.log(req.session);
  try {
    let appointments;

    if (req.session.instructor) {
      appointments = await Appointment.findAll({
        where: { instructorId: userId },
      });
    } else {
      appointments = await Appointment.findAll({
        where: { clientId: userId },
      });
    }
    console.log(appointments);
    return res.json(appointments);
  } catch (error) {
    console.error("error getting appointments", error);
  }
});

app.delete(
  "/api/instructor/:appointmentId",
  loginRequired,
  async (req, res) => {
    const appointment = await Appointment.findAll({
      where: {
        instructorId: req.params.instructorId,
      },
    }); // Extract the appointmentId from the parameters

    try {
      // Find the appt to be deleted based on apptId
      const apptToDelete = await Appointment.findByPk({
        appointment,
      });

      if (!apptToDelete) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Delete the appointment from the database
      await apptToDelete.destroy();

      res.status(204).send(); // Send 204 No Content response to indicate successful deletion
    } catch (error) {
      console.error("Error deleting appointment:", error);
      res.status(500).json({ message: "Internal server error" }); // Send 500 Internal Server Error response if there's an error
    }
  }
);

app.post("/api/admin/avail", loginRequired, async (req, res) => {
  const { instructorId } = req.session.user;
  const { date } = req.body;

  const instructor = await Instructor.findByPk(instructorId);
  console.log("instructor:", instructor);

  if (!instructor) {
    return res.status(401).json({ error: "Unauthorized", from: "/avail" }); // Send 401 Unauthorized response if user is not found
  }
  const availability = await Avail.create({ date: date });

  res.json(availability); // Send a JSON response containing the newly created post
});

app.get("/api/instructor/data", async (req, res) => {
  try {
    const instructor = await Instructor.findByPk(req.instructorId);
    res.json({ instructor });
  } catch (error) {
    console.error("Error Getting Instructor Data from server:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch instructor data from server" });
  }
});

app.post("/avail", async (req, res) => {
  try {
    const { date, instructorId } = req.body;
    const avail = await Avail.create({
      date,
      instructorId,
    });
    res.json({ avail });
  } catch (error) {
    res.status(500).json({ error: "Failed to save availability" });
  }
});

app.delete("/avail/:appointmentId", async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    await appointment.destroy();
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

ViteExpress.listen(app, PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
