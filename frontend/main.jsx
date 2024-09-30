import App from "./pages/App.jsx";
import { Courses } from "./pages/Courses.jsx";
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Users.jsx";
import "./index.css";
import globalStore from "./store/store.js";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      // errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        { path: "/login", element: <Login /> },
      ],
    },
  ]
  // createRoutesFromElements(
  //   <Route path="/" element={<App />}>
  //     <Route path="/" element={<Home />} />
  //     <Route path="/" element={<Instructors />} />
  //     <Route path="/courses" element={<Courses />} />
  //   </Route>
  // )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={globalStore}>
    <RouterProvider router={router} />
  </Provider>
);
