import Movie from "../Movie";
import ErrorPage from "./ErrorPage";
import Home from "./Home";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },

  // {
  //   path: "/",
  //   element: <Directors />,
  //   errorElement: <ErrorPage />,
  // },

  //   {
  //     path: "/",
  //     element: < />,
  //     errorElement: <ErrorPage />,
  //   },
  {
    path: "/movie/:id",
    element: <Movie />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
