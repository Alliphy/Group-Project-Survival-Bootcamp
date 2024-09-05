import "../index.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Instructors } from "./Instructors";

function App() {
  return (
    <>
      <header>
        <div className="w-screen h-screen bg-no-repeat bg-left-bottom bg-[url('/spooky-hands.jpeg')] libreBaskervilleMediumFont">
          {" "}
          <Link className="navLinkContainer">
            <nav>Home</nav>
            <nav>Courses</nav>
            <input type="search" placeholder="Search"></input>
          </Link>
          <div className="spookyTimeIncDiv">
            <p className="sixCapsFont">Spooky Time Inc Presents...</p>
            <p className="libreBaskervilleLargeFont">
              Ripley&apos;s Survival BootCamp
            </p>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
        <Instructors />
      </main>

      <footer>
        <div
          className="footerMasterDiv"
          style={{ backgroundImage: "url('/darkendTreeHands.svg')" }}
        >
          <p className="sixCapsFont footerContactPTag">Contact</p>
          <form className="footerContactForm">
            <div className="footerFormNameDiv">
              <input placeholder="First Name" type="text"></input>
              <input placeholder="Last Name" type="text"></input>
            </div>
            <div className="footerFormEmailSelectDiv">
              <input placeholder="Email" type="text"></input>
              <select name="instructorSelect" type="select">
                <option value={"Ripley"}>Ellen Ripley</option>
                <option value={"Strode"}>Laurie Strode</option>
                <option value={"Williams"}>Ash Williams</option>
                <option value={"Warren"}>Ed & Lorraine Warren</option>
                <option value={"Washington"}>Chris Washington</option>
                <option value={"Asakawa"}>Yoichi Asakawa</option>
              </select>
            </div>
            <div className="footerFormMessageDiv">
              <input placeholder="Message..." type="text"></input>
            </div>
          </form>
        </div>
      </footer>
    </>
  );
}

export default App;
