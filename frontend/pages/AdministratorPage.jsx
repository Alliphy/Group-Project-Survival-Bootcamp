import { DatePicker } from "../components/DatePicker.jsx";
import { useState, useEffect, useCallback } from "react";
import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";
import "../administrator.css";
import { useSelector } from "react-redux";

export const AdministratorPage = (props) => {
  // const instructorName = useSelector(
  //   (state) => state.globalState.user.lastName
  // );

  const isLoggedIn = useSelector((state) => {
    return state.globalState.user.userId;
  });

  const [currentInstructor, setCurrentInstructor] = useState({
    firstName: "",
    lastName: "",
  });

  const [courses, setCourses] = useState([]);
  const [selectCourse, setSelectCourse] = useState("");
  const [coursesToShow, setCoursesToShow] = useState([]);

  // State to hold the list of appointments for a selected course
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const userKeys = Object.keys(isLoggedIn);
    if (userKeys.includes("instructorId")) {
      console.log("instructor is logged in");
      return;
    } else {
      console.log("Not authorized");
    }
  }, []);

  useEffect(() => {
    fetch("/api/all-courses").then(async (data) => {
      const courses = await data.json();
      console.log("Courses: ", courses);
      setCourses(courses);
    });
  }, []);

  useEffect(() => {
    fetch("/api/my-appointments").then(async (data) => {
      const appointments = await data.json();

      console.log("Appointments", appointments);

      setAppointments(appointments);
    });
  }, []);

  console.log(currentInstructor);

  return (
    isLoggedIn.email && (
      <div className="instructor-admin-page">
        <h2>
          Welcome, {isLoggedIn.firstName} {isLoggedIn.lastName}
        </h2>
        <p>Course Data</p>
        <div>
          {appointments.map((appointment) => (
            <div key={appointment.appointmentId}>
              <p>{new Date(appointment.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
        {/* 
        <DatePicker
          selectInstructor={instructorName}
          date={date}
          setDate={setDate}
          availability={appointments}
        /> */}
      </div>
    )
  );
};
