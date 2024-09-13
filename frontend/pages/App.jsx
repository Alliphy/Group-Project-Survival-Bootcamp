import "../index.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { DatePicker } from "./DatePicker";
import { useMemo, useState } from "react";

const courses = {
  Ripley: [
    {
      name: "Anatomy of Death",
      // ...
    },
  ],
  Strode: [
    {
      name: "Fuck it",
    },
  ],
};

function App() {
  const [selectInstructor, setSelectInstructor] = useState("");
  const [selectCourse, setSelectCourse] = useState("");

  const coursesToShow = useMemo(() => {
    return courses[selectInstructor] || [];
  }, [selectInstructor]);

  return (
    <>
      <header>
        <div className="navLinkContainer">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <input type="search" placeholder="Search"></input>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

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
                onChange={(e) => setSelectInstructor(e.target.value)}
              >
                <option value={""}>Select an Instructor</option>
                <option value={"Ripley"}>Ellen Ripley</option>
                <option value={"Strode"}>Laurie Strode</option>
                <option value={"Williams"}>Ash Williams</option>
                <option value={"Warren"}>Ed & Lorraine Warren</option>
                <option value={"Washington"}>Chris Washington</option>
                <option value={"Asakawa"}>Yoichi Asakawa</option>
              </select>
              {selectInstructor && (
                <select onChange={(e) => setSelectCourse(e.target.value)}>
                  <option value={""}>Select a Course</option>
                  {coursesToShow.map((course) => (
                    <option value={course.name} key={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              )}
              {selectInstructor && selectCourse && <DatePicker />}
            </div>
            <div className="footerFormMessageDiv">
              <input placeholder="Message..." type="text"></input>
            </div>
          </form>
        </div>
      </footer>
    </>
  );
}

export default App;
