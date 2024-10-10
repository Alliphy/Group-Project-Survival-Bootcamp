import { useSelector } from "react-redux";
import "../clientProfile.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const ClientProfile = () => {
  const isLoggedIn = useSelector((state) => {
    return state.globalState.user;
  });

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
