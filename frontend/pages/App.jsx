import "../index.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Footer } from "../Layouts/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
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
            <Link to="/logout">Logout</Link>
          </div>
        </header>
      )}

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;
