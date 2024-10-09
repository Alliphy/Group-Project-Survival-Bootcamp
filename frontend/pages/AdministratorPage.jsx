import { DatePicker } from "../components/DatePicker.jsx";
import { useState, useEffect, useCallback } from "react";
import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";
import "../administrator.css";

export const AdministratorPage = (props) => {
  // State to hold the list of courses fetched from the API
  const [courseData, setCourseData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Selected date for datepicker
  const [courseAvailability, setCourseAvailability] = useState([]); // List of available dates for current course

  const handleSaveDate = async (e) => {
    e.preventDefault();
    // Check if both title and body have content before proceeding
    if (courseData) {
      return;
    }

    try {
      // Prepare the payload (our data to send) for the post request
      const payload = {
        title: Courses.title,
        instructorId: Courses.instructorId,
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

  const fetchCourses = useCallback(() => {
    fetch(`/api/courses`, {
      method: "GET", // Use GET for receiving data
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      //once our promise is fulfilled we will then take our response to access the api call to gather all our post data within our array
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        const courses = data.courses; // accessing "courses" property from data
        console.log("courses: ", courses);

        // Check if the data is an array of posts before updating state
        if (Array.isArray(courses)) {
          setCourseData(courses);
        }
      })
      .catch((e) => {
        console.log("does it make it here? ");
        console.error(e);
      });
  }, []);

  // Function to delete a availability by its ID
  const handleDeleteAppointment = async (dateId) => {
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
      fetchCourses();
    } catch (error) {
      console.error("Error deleting Availability:", error);
      alert("There was an error deleting. Please try again later.");
    }
  };

  const onAvailChange = (data) => {
    console.log("avail changed");
    console.log("here is the data: ", data);
    fetchCourses(); // Re-fetch courses after changing availability
  };

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Function to handle date selection in the datepicker
  const handleDateChange = (selectedDates) => {
    setSelectedDate(dayjs(selectedDates[0]));
  };

  return (
    <div className="instructor-admin-page">
      <h2>Course: {props.Course}</h2>
      <p>{props.appointment}</p>
      <h2>Appointments</h2>
      <ul>
        {/* List appointments for the selected course */}
        <button
          onClick={() => handleDeleteAppointment(appointment.appointmentId)}
        >
          Delete Appointment
        </button>
      </ul>

      {/* Availability calendar */}
      <h2>Availability</h2>

      <DatePicker
        selectInstructor="Ripley"
        value={selectedDate.toDate()}
        availability={[]}
      />
    </div>
  );
};
