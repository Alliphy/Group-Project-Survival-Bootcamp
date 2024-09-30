import App from "./pages/App.jsx";
import { Home } from "./pages/Home.jsx";
import { Instructors } from "./pages/Instructors.jsx";
import "./index.css";
import globalStore from "./store/store.js";
import { Provider } from "react-redux";
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
      <Route path="/" element={<Instructors />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={globalStore}>
    <RouterProvider router={router} />
  </Provider>
);
