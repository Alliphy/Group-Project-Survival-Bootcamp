import { useState } from "react";
import axios from "axios";
import "../loginPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => {
    return state.globalState.user;
  });
  const admin = useSelector((state) => {
    return state.globalState.instructor;
  });

  console.log(isLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log(response);

      if (response.ok) {
        // Parsing the response data using json
        const data = await response.json();
        // Handle successful login (redirect, set session)
        console.log("Login successful!");
        localStorage.setItem("isLoggedIn", JSON.stringify(data.user));
        dispatch({ type: "SET_USER", payload: data.user });
        const userKeys = Object.keys(data.user);
        console.log(userKeys);
        if (userKeys.includes("instructorId")) {
          dispatch({ type: "SET_ADMIN" });
          navigate("/admin");
          console.log("hit set admin!!");
        } else {
          navigate("/client");
        }
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

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
    <div className="formMasterDiv">
      {!isLoggedIn.email && (
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Email:</label>
          <input
            type="text"
            value={email}
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <label className="login-label">Password:</label>
          <input
            type="password"
            // Change to "password" for security
            value={password}
            autoComplete="password"
            required
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      )}

      {isLoggedIn.email && (
        <div>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
};
