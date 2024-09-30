import "../index.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Footer } from "../Layouts/Footer";

function App() {
  return (
    <>
      <header>
        <div className="navLinkContainer">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/login">Login</Link>
          <input type="search" placeholder="Search"></input>
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
