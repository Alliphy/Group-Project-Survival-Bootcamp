import "./index.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <div className="w-screen h-screen bg-no-repeat bg-left-bottom bg-[url('/spooky-hands.jpeg')]">
          {" "}
          <Link className="flex justify-end p-5">
            <nav className="p-5">Home</nav>
            <nav className="p-5">Courses</nav>
            <input type="search" placeholder="Search" className="p-5"></input>
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <div>
          <p>Contact</p>
          <form>
            <div>
              <input></input>
              <input></input>
            </div>
            <div>
              <input></input>
              <select name="" type="select">
                <option value="Ripley">Ellen Ripley</option>
                <option></option>
                <option></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <input></input>
          </form>
        </div>
      </footer>
    </>
  );
}

export default App;
