import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import "dotenv/config";

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
    secret: process.env.SESSSION_SECRET,
    saveUninitialized: true,
    resave: false,
  })
);

app.get("/dummy", (req, res) => {
  const dummyData = [
    {
      id: 1,
      email: "john.doe@example.com",
      firstName: "Ellen",
      lastName: "Ripley",
      password: "password123",
      courses: [
        {
          courseId: 101,
          title: "Introduction to Programming",
          description:
            "This course provides an introduction to programming concepts using Python.",
          availability: ["2024-10-24"],
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
      id: 2,
      email: "jane.smith@example.com",
      firstName: "Laurie",
      lastName: "Strode",
      password: "securePass456",
      courses: [
        {
          courseId: 201,
          title: "Advanced Mathematics",
          description:
            "A deep dive into advanced calculus, algebra, and statistical methods.",
          availability: ["2024-10-01"],
        },
        {
          courseId: 202,
          title: "Linear Algebra",
          description:
            "Learn the fundamentals of linear algebra, matrices, and vector spaces.",
          availability: ["2024-10-15"],
        },
      ],
    },
  ];

  res.status(200).json({ data: dummyData, success: true });
});

ViteExpress.listen(app, PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
