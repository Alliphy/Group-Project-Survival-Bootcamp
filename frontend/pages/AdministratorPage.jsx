import { DatePicker } from "../components/DatePicker.jsx";
import { useState, useEffect, useCallback } from "react";
import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";
import "../administrator.css";
import { useSelector } from "react-redux";

export const AdministratorPage = (props) => {
  const instructorName = useSelector(
    (state) => state.globalState.user.firstName
  );
  const [currentInstructor, setCurrentInstructor] = useState({
    firstName: "",
    lastName: "",
  });
  // State to hold the list of courses for the current instructor
  const [courses, setCourses] = useState([]);
  // State to hold the list of appointments for a selected course
  const [appointments, setAppointments] = useState([]);
  // State to hold the selected course ID
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  // State to hold the selected date for datepicker
  const [date, setDate] = useState(dayjs());

  console.log(date);

  const isLoggedIn = useSelector((state) => {
    return state.globalState.user;
  });

  // Function to fetch appointments for a selected course
  const fetchAppointments = useCallback(async (courseId) => {
    if (!courseId) return;

    try {
      const response = await fetch(`/api/appointments`, {
        method: "GET", // Use GET to fetch appointments
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching appointments: ${response.statusText}`);
      }

      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, []);

  // Function to handle date selection in the datepicker
  // const handleDateChange = (selectedDates) => {
  //   setSelectedDates(dayjs(selectedDates[0]));
  // };
  // Fetches a list of all instructors
  // useEffect(() => {
  //   fetch(`/api/instructor-course/${courseId}`).then(async (data) => {
  //     const courses = await data.json();
  //     console.log("courses: ", courses);

  //     setCourses(courses);
  //   });
  // }, []);

  console.log(currentInstructor);

  useEffect(() => {
    if (selectedCourseId) {
      fetchAppointments(selectedCourseId);
    }
  }, [selectedCourseId, fetchAppointments]);

  return (
    isLoggedIn.email && (
      <div className="instructor-admin-page">
        <h2>
          Welcome, {isLoggedIn.firstName} {isLoggedIn.lastName}
        </h2>
        <p>Course Data</p>

        <DatePicker
          selectInstructor={instructorName}
          date={date}
          setDate={setDate}
          availability={[]}
        />
      </div>
    )
  );
};
