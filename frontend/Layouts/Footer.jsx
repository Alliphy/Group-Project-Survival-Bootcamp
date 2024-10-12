import { DatePicker } from "../components/DatePicker.jsx";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import "../footer.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Footer = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(dayjs());

  const [selectInstructor, setSelectInstructor] = useState("");
  const [selectAllInstructors, setSelectAllInstructors] = useState([]);

  const [courses, setCourses] = useState([]);
  const [selectCourse, setSelectCourse] = useState("");
  const [coursesToShow, setCoursesToShow] = useState([]);

  const isLoggedIn = useSelector((state) => {
    return state.globalState.user;
  });

  function getInstructorId() {
    const selectedInstructor = selectAllInstructors.find(
      (instructor) => instructor.lastName === selectInstructor
    );
    return selectedInstructor.instructor_id;
  }

  function getCourseId() {
    const selectedCourse = courses.find(
      (course) => course.title === selectCourse.title
    );
    console.log("selected course:", selectedCourse);
    return selectedCourse.courseId;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/create-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          instructor_id: getInstructorId(),
          client_id: isLoggedIn.clientId,
          course_id: getCourseId(),
        }),
      });

      if (response.ok) {
        // Handle successful login (redirect, set session)
        console.log("Course Sign Up Successful!");
        window.alert("Appointment created!");
        navigate("/courses");
      } else {
        console.error("Sign Up for Courses Failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Fetches a list of all instructors
  useEffect(() => {
    fetch("/api/instructor-list").then(async (data) => {
      const instructors = await data.json();
      console.log("Instructors: ", instructors);

      setSelectAllInstructors(instructors);
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

  useEffect(() => {
    fetch("/api/all-courses").then(async (data) => {
      const courses = await data.json();
      console.log("Courses: ", courses);
      setCourses(courses);
    });
  }, []);

  return (
    <footer>
      <div
        className="footerMasterDiv"
        style={{ backgroundImage: "url('/darkendTreeHands.svg')" }}
      >
        <p className="sixCapsFont footerContactPTag">Schedule Appointment</p>

        {!isLoggedIn.email ? (
          <div className="footerLoginForm">
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
            <div className="footerFormNameDiv"></div>
            <div className="footerFormEmailSelectDiv">
              <select
                name="instructorSelect"
                type="select"
                onChange={handleSelectInstructor}
                defaultValue={""}
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
                  defaultValue={""}
                  onChange={(e) => {
                    const index = coursesToShow.findIndex((courses) => {
                      return courses.title === e.target.value;
                    });
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
                  date={date}
                  setDate={setDate}
                />
              )}
            </div>
            <div className="footerFormMessageDiv">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        )}
      </div>
    </footer>
  );
};
