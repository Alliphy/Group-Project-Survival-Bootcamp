import express from "express";
import process from "process";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import "dotenv/config";
import Client from "./models/client.js";
import cors from "cors";
import Instructor from "./models/instructor.js";
import Appointment from "./models/appointment.js";
import { Avail } from "./models/avail.js";

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

// app.post("/api/adminlogin", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);

//     const foundInstructor = await Instructor.findOne({ where: { email } });

//     if (!foundInstructor) {
//       return res.status(401).send("Unauthorized");
//     }

//     // Check for instructor first
//     if (foundInstructor) {
//       if (foundInstructor.password !== password) {
//         return res.status(401).send("Unauthorized");
//       }
//       // Set session for instructor
//       req.session.logged_in = true;
//       req.session.user = {
//         instructorId: foundInstructor.instructorId,
//         email: foundInstructor.email,
//         password: foundInstructor.password,
//       };

//       return res.json({
//         user: { instructor: true }, // Indicate instructor login
//         message: "You are now logged in!",
//         success: true,
//         session: req.session,
//       });
//     }
//   } catch (e) {
//     console.log("hit catch");
//     res.status(500).json({ error: "Server Error" });
//   }
// });

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
