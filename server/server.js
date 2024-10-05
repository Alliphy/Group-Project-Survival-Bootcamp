import express from "express";
import process from "process";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import "dotenv/config";
import Client from "./models/client.js";
import cors from "cors";

const app = express();
const PORT = 5090;

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
