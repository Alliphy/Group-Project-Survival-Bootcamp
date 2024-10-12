import { useSelector } from "react-redux";
import "../clientProfile.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ClientProfile = () => {
  const isLoggedIn = useSelector((state) => {
    return state.globalState.user;
  });

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("/api/my-appointments").then(async (data) => {
      const appointments = await data.json();

      console.log("Appointments", appointments);

      setAppointments(appointments);
    });
  }, []);

  useEffect(() => {
    const userKeys = Object.keys(isLoggedIn);
    if (userKeys.includes("clientId")) {
      console.log("client is logged in");
      return;
    } else {
      console.log("Not authorized");
    }
  }, []);

  return isLoggedIn.email ? (
    <div className="client-profile-page">
      <h2>
        Welcome, {isLoggedIn.firstName} {isLoggedIn.lastName}
      </h2>
      <p>Appointment Data</p>
      <div>
        {appointments.map((appointment) => (
          <div key={appointment.appointmentId}>
            <p>{new Date(appointment.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="unauthorized-profile-page">
      <p>Please login to use this page</p>
      <Link to="/signup">
        <button type="button">Sign Up</button>
      </Link>
      <p>Or</p>
      <Link to="/login">
        <button type="button">Login</button>
      </Link>
    </div>
  );
};
