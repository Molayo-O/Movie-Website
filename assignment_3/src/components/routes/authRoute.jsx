//This component simply checks if the user is authenticated
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Authentication";

const AuthRoute = () => {
  //Access isAuth value from AuthContext global state
  const { isAuth } = useContext(AuthContext);
  //determine if isAuth == True. if so render children component, else redirect to login page
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
