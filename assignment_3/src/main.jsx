import React from "react";
import ReactDOM from "react-dom/client";
import routes from "./components/routes/routes";
import AuthContextProvider from "./components/Authentication";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/Layout.css";

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
