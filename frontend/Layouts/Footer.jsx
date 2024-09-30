import { DatePicker } from "../components/DatePicker.jsx";
import { useState, useEffect } from "react";

export const Footer = () => {
  const [selectInstructor, setSelectInstructor] = useState("");
  const [selectCourse, setSelectCourse] = useState("");
  const [selectAllInstructors, setSelectAllInstructors] = useState([]);

  const [coursesToShow, setCoursesToShow] = useState([]);

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
              onChange={(e) => {
                setSelectInstructor(e.target.value);
                console.dir(e.target);
                const index = selectAllInstructors.findIndex((instructor) => {
                  //whatever returns true on findIndex will return the value of index
                  return instructor.firstName === e.target.value;
                });
                console.log(index);

                setCoursesToShow(selectAllInstructors[index].courses);
              }}
            >
              <option value={""} disabled>
                Select an Instructor
              </option>
              {selectAllInstructors.map((instructor, index) => (
                <option
                  data-id={instructor.id}
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
                selectCourse={selectCourse}
              />
            )}

            {/* availability: ["2024-10-05"], */}
          </div>
          <div className="footerFormMessageDiv">
            <input placeholder="Message..." type="text"></input>
          </div>
        </form>
      </div>
    </footer>
  );
};
