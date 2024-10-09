import "../index.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Footer } from "../Layouts/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (loggedIn) {
      console.log(loggedIn);
      dispatch({ type: "SET_USER", payload: loggedIn });
      const userKeys = Object.keys(loggedIn);
      if (userKeys.includes("instructorId")) {
        dispatch({ type: "SET_ADMIN" });
      }
    }
  }, [dispatch]);

  return (
    <>
      <header>
        <div className="navLinkContainer">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/login">Login</Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;
