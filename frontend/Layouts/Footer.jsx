import { DatePicker } from "../components/DatePicker.jsx";
import { useState, useEffect } from "react";
import "../footer.css";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import { Link } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const [selectInstructor, setSelectInstructor] = useState("");
  const [selectAllInstructors, setSelectAllInstructors] = useState([]);

  const [courses, setCourses] = useState([]);
  const [coursesToShow, setCoursesToShow] = useState([]);
  const [selectCourse, setSelectCourse] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const localIsLoggedIn = localStorage.getItem("isLoggedIn");
    // console.log(localIsLoggedIn); // for debugging purposes
    if (localIsLoggedIn === "true") {
      return true;
    } else {
      return false;
    }
  });

  // Fetches a list of all instructors
  useEffect(() => {
    fetch("/api/instructor-list").then(async (data) => {
      const instructors = await data.json();
      console.log("Instructors: ", instructors);

      setSelectAllInstructors(instructors);
    });
  }, []);

  // Fetches all courses
  useEffect(() => {
    fetch("/api/all-courses").then(async (data) => {
      const courses = await data.json();
      console.log("Courses: ", courses);
      setCourses(courses);
    });
  }, []);

  function handleSelectInstructor(e) {
    const selectedInstructorCourses = [];
    setSelectInstructor(e.target.value);

    // For future reference, this only works if all the instructors are fetched in order.
    // If an instructor is deleted, this will NEED to be refactored in order to work.
    const instructorId = e.target.selectedIndex;

    const index = selectAllInstructors.findIndex((instructor) => {
      //whatever returns true on findIndex will return the value of index
      return instructor.firstName === e.target.value;
    });
    for (const course of courses) {
      if (course.instructorId === instructorId) {
        selectedInstructorCourses.push(course);
      }
    }
    setCoursesToShow(selectedInstructorCourses);
  }

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
          <form className="footerContactForm">
            <div className="footerFormNameDiv">
              <input placeholder="First Name" type="text"></input>
              <input placeholder="Last Name" type="text"></input>
            </div>
            <div className="footerFormEmailSelectDiv">
              <input placeholder="Email" type="text"></input>
              <select
                name="instructorSelect"
                type="select"
                onChange={handleSelectInstructor}
              >
                <option value={""} disabled>
                  Select an Instructor
                </option>
                {selectAllInstructors.map((instructor, index) => (
                  <option
                    data-id={instructor.instructor_id}
                    value={instructor.lastName}
                    key={instructor.instructor_id}
                    defaultValue={index === 0 ? true : false}
                  >
                    {instructor.firstName + " " + instructor.lastName}
                  </option>
                ))}
              </select>
              {selectInstructor && (
                <select
                  name="courseSelect"
                  type="select"
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
                      key={`${courses.title}-${index}`}
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
