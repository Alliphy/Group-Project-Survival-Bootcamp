import { DatePicker } from "../components/DatePicker.jsx";
import { useState, useEffect } from "react";
import "../footer.css";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import { Link } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const [selectInstructor, setSelectInstructor] = useState("");
  const [selectCourse, setSelectCourse] = useState("");
  const [selectAllInstructors, setSelectAllInstructors] = useState([]);
  const [email, setEmail] = useState({ email: "" });
  const [firstName, setFirstName] = useState({ firstName: "" });
  const [lastName, setLastName] = useState({ lastName: "" });
  const [availability, setAvailability] = useState({
    availability: Date(Dayjs),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const localIsLoggedIn = localStorage.getItem("isLoggedIn");
    // console.log(localIsLoggedIn); // for debugging purposes
    if (localIsLoggedIn === "true") {
      return true;
    } else {
      return false;
    }
  });

  const [newCourseClient, setNewCourseClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    selectInstructor: [],
    selectCourse: [],
    availability: [],
  });

  const [coursesToShow, setCoursesToShow] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/courseSelection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          selectInstructor,
          selectCourse,
          availability,
        }),
      });

      if (response.ok) {
        // Handle successful login (redirect, set session)
        console.log("Course Sign Up Successful!");
        navigate("/courses");
      } else {
        console.error("Sign Up for Courses Failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    fetch("/dummy").then(async (data) => {
      const courses = await data.json();
      console.log(courses);

      setSelectAllInstructors(courses.data);
    });
  }, []);

  console.log(selectAllInstructors);

  return (
    <footer>
      <div
        className="footerMasterDiv"
        style={{ backgroundImage: "url('/darkendTreeHands.svg')" }}
      >
        <p className="sixCapsFont footerContactPTag">Sign Up</p>

        {!isLoggedIn ? (
          <div>
            <Link to="/signup">
              <button type="button">Sign Up</button>
            </Link>
            <p>Or</p>
            <Link to="/login">
              <button type="button">Login</button>
            </Link>
          </div>
        ) : (
          <form className="footerContactForm" onSubmit={handleSubmit}>
            <div className="footerFormNameDiv">
              <input
                placeholder="First Name"
                type="text"
                value={newCourseClient.firstName}
                onChange={(e) =>
                  setNewCourseClient((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              ></input>
              <input
                placeholder="Last Name"
                type="text"
                value={newCourseClient.lastName}
                onChange={(e) =>
                  setNewCourseClient((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              ></input>
            </div>
            <div className="footerFormEmailSelectDiv">
              <input
                placeholder="Email"
                type="text"
                value={newCourseClient.email}
                onChange={(e) =>
                  setNewCourseClient((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              ></input>
              <select
                name="instructorSelect"
                type="select"
                onChange={(e) => {
                  setSelectInstructor(e.target.value);
                  console.dir(e.target);
                  const index = selectAllInstructors.findIndex((instructor) => {
                    //whatever returns true on findIndex will return the value of index
                    return instructor.firstName === e.target.value;
                  });
                  console.log(index);

                  setCoursesToShow(selectAllInstructors[index].Courses);
                }}
              >
                <option value={""} disabled>
                  Select an Instructor
                </option>
                {selectAllInstructors.map((instructor, index) => (
                  <option
                    data-id={instructor.instructorId}
                    value={instructor.firstName}
                    key={instructor.firstName}
                    defaultValue={index === 0 ? true : false}
                  >
                    {instructor.firstName}
                  </option>
                ))}
              </select>
              {selectInstructor && (
                <select
                  onChange={(e) => {
                    const index = coursesToShow.findIndex((courses) => {
                      return courses.title === e.target.value;
                    });
                    console.log(index);
                    setSelectCourse(coursesToShow[index]);
                  }}
                >
                  <option value={""} disabled>
                    Select a Course
                  </option>
                  {coursesToShow.map((courses, index) => (
                    <option
                      value={courses.title}
                      key={courses.title}
                      defaultValue={index === 0 ? true : false}
                    >
                      {courses.title}
                    </option>
                  ))}
                </select>
              )}
              {selectInstructor && selectCourse && (
                <DatePicker
                  selectInstructor={selectInstructor}
                  availability={selectInstructor.availability}
                />
              )}
              {console.log(selectInstructor.availability)}
              {/* availability: ["2024-10-05"], */}
            </div>
            <div className="footerFormMessageDiv">
              <button>Submit</button>
            </div>
          </form>
        )}
      </div>
    </footer>
  );
};
