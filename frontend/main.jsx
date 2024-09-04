import App from "./App.jsx";
import { Home } from "./Home.jsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
