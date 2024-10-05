import { useState } from "react";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Handle successful login (redirect, set session)
        console.log("Sign Up successful!");
      } else {
        console.error("Sign Up failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="formMasterDiv">
        <form onSubmit={handleSubmit} className="signup-form">
          <label className="sign-up-label">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="sign-up-input"
          ></input>
          <label className="sign-up-label">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="sign-up-input"
          ></input>
          <label className="sign-up-label">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sign-up-input"
          />
          <label className="sign-up-label">Password:</label>
          <input
            type="password"
            // Change to "password" for security
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="sign-up-input"
          />
          <button type="submit" className="signUp-button">
            Sign-Up
          </button>
        </form>
      </div>
    </>
  );
};
