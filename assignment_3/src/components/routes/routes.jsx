import Movie from "../Movie";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },

      // {
      //   path: "/signup",
      //   element: <Signup />,
      //   errorElement: <ErrorPage />,
      // },

        {
          path: "/login",
          element: <Login />,
          errorElement: <ErrorPage />,
        },
      {
        path: "/movie/:id",
        element: <Movie />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];

export default routes;
