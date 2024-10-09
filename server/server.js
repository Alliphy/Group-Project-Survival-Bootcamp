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
  console.log("Req.body for instructor avails: ", req.body);

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
    attributes: ["date"],
    where: whereClause,
  });
  const parsedAvails = allAvails.map((avail) => avail.dataValues.date);
  console.log("parsed avails: ", parsedAvails);
  res.json(parsedAvails);
});

// Make call to get ALL Instructors
app.get("/api/instructor-list", async (req, res) => {
  const allInstructors = await Instructor.findAll({
    attributes: ["instructor_id", "firstName", "lastName"],
  });
  res.json(allInstructors);
});

// Endpoint for getting ALL courses
app.get("/api/all-courses", async (req, res) => {
  const allCourses = await Course.findAll({
    attributes: ["title", "instructorId"],
  });
  res.json(allCourses);
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const foundUser = await Client.findOne({ where: { email } });

    if (!foundUser) {
      return res.status(401).send("Unauthorized");
    }

    if (foundUser.password !== password) {
      return res.status(401).send("Unauthorized");
    }

    req.session.logged_in = true;
    req.session.user = {
      userId: foundUser.userId,
      email: foundUser.email,
      password: foundUser.password,
    };

    return res.json({
      user: foundUser,
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

app.post("/api/create-appointment", async (req, res) => {
  const { date, instructor_id, client_id } = req.body;
  await Appointment.create({
    date,
    instructor_id,
    client_id,
  });

  return res.send("appointment created");
});

// Custom route middleware function that checks if the user is logged in.
function loginRequired(req, res, next) {
  // console.log("session", req.session); // Log session for debugging

  // Check if user is logged in by checking if the user ID exists in the session

  if (!req.session.user.instructorId || !req.session.user.clientId) {
    // Send 401 Unauthorized response if not logged in
    res.status(401).json({ error: "Unauthorized", from: "middleware" });
  } else {
    next(); // Call the next middleware if user is logged in
  }
}
// Note the `loginRequired` argument passed to the routes below!

app.post("/api/logout", (req, res) => {
  console.log("hit logout");
  // Destroy the user session
  req.session.destroy();
  // Send a success response
  res.json({ success: true });
});

app.get("/api/appointment", async (req, res) => {
  const appointments = await Appointment.findAll();
  console.log("Hit");
  return res.json({ appointments }); // Send a JSON response containing the list of appointments
});

app.delete(
  "/api/appointment/:appointmentId",
  loginRequired,
  async (req, res) => {
    const appointmentId = req.params.appointmentId; // Extract the appointmentId from the parameters

    try {
      // Find the appt to be deleted based on apptId
      const apptToDelete = await Appointment.findByPk(appointmentId);

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

app.get("/dummy", (req, res) => {
  const dummyData = [
    {
      instructorId: 1,
      email: "john.doe@example.com",
      firstName: "Ellen",
      lastName: "Ripley",
      password: "password123",
      availability: ["2024-10-24"],
      Courses: [
        {
          courseId: 101,
          title: "Introduction to Programming",
          description:
            "This course provides an introduction to programming concepts using Python.",
        },
        {
          courseId: 102,
          title: "Data Structures",
          description:
            "Learn about data structures such as arrays, stacks, queues, and linked lists.",
          availability: ["2024-10-05"],
        },
      ],
    },
    {
      instructorId: 2,
      email: "jane.smith@example.com",
      firstName: "Laurie",
      lastName: "Strode",
      password: "securePass456",
      availability: ["2024-10-01"],
      Courses: [
        {
          courseId: 201,
          title: "Advanced Mathematics",
          description:
            "A deep dive into advanced calculus, algebra, and statistical methods.",
        },
        {
          courseId: 202,
          title: "Linear Algebra",
          description:
            "Learn the fundamentals of linear algebra, matrices, and vector spaces.",
        },
      ],
    },
  ];

  res.status(200).json({ data: dummyData, success: true });
});

ViteExpress.listen(app, PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
