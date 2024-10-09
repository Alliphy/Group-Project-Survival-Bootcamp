import { DatePicker } from "../components/DatePicker.jsx";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";
import "../administrator.css";

export const AdministratorPage = (props) => {
  // State to hold the list of courses fetched from the API
  const [courseData, setCourseData] = useState({ courseId: [], title: "" });

  const [selectedDate, setSelectedDate] = useState(dayjs()); // Selected date for datepicker

  const [courseAvailability, setCourseAvailability] = useState([]); // List of available dates for sign up
  const [apptData, setApptData] = useState({
    appointmentId: [],
    date: Date(dayjs()),
  });

  const isInstructor = useSelector((state) => {
    return state.globalState.instructor;
  });
  console.log(isInstructor);

  const handleSaveAvail = async (e) => {
    e.preventDefault();
    // Check if both title and body have content before proceeding
    if (isInstructor) {
      return;
    }

    try {
      // Prepare the payload (our data to send) for the post request
      const payload = {
        instructorId: Course.instructorId,
        appointmentId: Appointment.appointmentId,
        date: Appointment.date,
      };

      // Send a POST request to the API endpoint to save the new post
      const response = await fetch("/api/instructor/avail", {
        method: "POST", // Use POST for sending data
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Handle errors from the API response
      if (!response.ok) {
        throw new Error(`Error saving post: ${response.statusText}`);
      }

      // Parsing the response data using json
      const data = await response.json();

      // console log for our post data after successfully created
      // console.log("post data after create: ", data);

      // Perform additional actions after successful availability change
      onAvailChange(data);
      // Reset the new post data to an empty object
      setCourseData([]);
    } catch (error) {
      console.error("Error saving date:", error);
      alert("There was an error saving the date. Please try again later.");
    }
  };

  const fetchAppts = useCallback(() => {
    fetch(`/api/appointments`, {
      method: "GET", // Use GET for receiving data
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      //once our promise is fulfilled we will then take our response to access the api call to gather all our appointment data within our array
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        const appointment = data.appointment; // accessing "appointments" property from data
        console.log("appointments: ", appointment);

        // Check if the data is an array of appointments before updating state
        if (Array.isArray(appointment)) {
          setCourseData(appointment);
        }
      })
      .catch((e) => {
        console.log("does it make it here? ");
        console.error(e);
      });
  }, []);

  // Function to delete a Appt by its ID
  const deleteAppt = async (dateId) => {
    try {
      // Send a DELETE request to the API endpoint to remove availability
      const response = await fetch(`/api/avail/${dateId}`, {
        method: "DELETE", // Use DELETE for removing data
      });
      // Handle errors from the API response
      if (!response.ok) {
        throw new Error(`Error deleting appointment: ${response.statusText}`);
      }

      console.log("Appointment Updated successfully!");
      // Update the UI with the new list of posts after deletion
      fetchAppts();
    } catch (error) {
      console.error("Error deleting Availability:", error);
      alert("There was an error deleting. Please try again later.");
    }
  };

  const onAvailChange = (data) => {
    console.log("avail changed");
    console.log("here is the data: ", data);
    fetchAppts(); // Re-fetch appts after changing availability
  };

  useEffect(() => {
    fetchAppts();
  }, [fetchAppts]);

  // Function to handle date selection in the datepicker
  const handleDateChange = (selectedDates) => {
    setSelectedDate(dayjs(selectedDates[0]));
  };

  return (
    <div className="instructor-admin-page">
      {/* <select
        onClick={(e) => {
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

      <p>{props.appointment}</p>
      <p>Appointments</p>
      <ul className="appointmentList">
        {/* List appointments for the selected course */}
      {/* <button
          onClick={() => handleDeleteAppointment(appointment.appointmentId)}
        >
          Delete Appointment
        </button>
      </ul>

      {/* Availability calendar */}
      {/* <div className="availabilityDiv">
        <p className="availPTag">Edit Availability</p>

        <DatePicker value={selectedDate.toDate()} availability={[]} />
      </div> */}

      {/* <section className="flex flex-col courseDisplaySection"> */}
      {/* Display all courses */}
      {/* {courseData}
        {courseData.map((course) => (
          <div key={course.courseId}>
            <p className=" courseAdminTitle">{course.title}</p>
          </div>
        ))}
      </section> */}

      <section>
        {/* {apptData.length === 0} */}
        {/* {apptData.map((appointment) => (
          <div key={appointment.appointmentId}>
            <p className=" courseAdminTitle">{appointment.date}</p> */}
        <button
          className="deleteApptBtn"
          // onClick={() => deleteAppt(appointment.appointmentId)}
        >
          Delete
        </button>

        <DatePicker value={selectedDate.toDate()} availability={[]} />
        {/* </div> */}
        {/* ))} */}
      </section>
    </div>
  );
};
