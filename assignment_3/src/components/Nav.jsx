import { NavLink } from "react-router-dom";
import "../styles/Nav.css";

function Nav() {
  return (
    <>
      <nav className="Navbar">
        <NavLink to="/">Watched It!</NavLink>
        <NavLink to="/Login">Log In</NavLink>
        <NavLink to="/Signup">Sign Up</NavLink>
      </nav>
    </>
  );
}

export default Nav;
