import Login from "./Login";
import SignUp from "./SignUp";
import Movie from "../Movie";
import WatchList from "../watchList";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Layout from "./Layout";
import AuthRoute from "./authRoute";
import CompletedWatchlist from "../CompletedWatchList";
const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
      },
      {
        path: "/Signup",
        element: <SignUp />,
      },

      {
        //routes only authenticated users can visit
        path: "/MyAccount",
        element: <AuthRoute />,
        children: [
          {
            path: "/MyAccount/Watchlist",
            element: <WatchList />,
            errorElement: <ErrorPage />,
          },

          {
            path: "/MyAccount/CompletedWatchList",
            element: <CompletedWatchlist />,
            errorElement: <ErrorPage />,
          }
        ]
      },
    ],
  },
];

export default routes;
