import "../index.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Footer } from "../Layouts/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (loggedIn) {
      console.log(loggedIn);
      dispatch({ type: "SET_USER", payload: loggedIn });
    } else {
      return;
    }
    const userKeys = Object.keys(loggedIn);
    console.log(userKeys);
    if (userKeys.includes("instructorId")) {
      dispatch({ type: "SET_ADMIN" });
      console.log("hit set admin!!");
    }
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => {
    return state.globalState.user;
  });

  const admin = useSelector((state) => {
    return state.globalState.instructor;
  });

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const res = await axios.post("/api/logout"); // Send a POST request to the logout API endpoint
    if (res.data.success) {
      // Check if the logout API response is successful
      localStorage.removeItem("isLoggedIn"); // Set local storage to indicate not logged in
      dispatch({ type: "LOGOUT" });
      navigate("/"); // Navigate to the home page when logged out
    }
  };

  return (
    <>
      {!isLoggedIn.email ? (
        <header>
          <div className="navLinkContainer">
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/login">Login</Link>
          </div>
        </header>
      ) : (
        <header>
          <div className="navLinkContainer">
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            {!admin ? (
              <Link to="/client">Profile</Link>
            ) : (
              <Link to="/admin">Profile</Link>
            )}
            <Link onClick={handleLogout}>Logout</Link>
          </div>
        </header>
      )}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
