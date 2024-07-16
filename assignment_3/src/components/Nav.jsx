import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav className="Navbar">
        <NavLink to="/">
          <h1>Watched It!</h1>
        </NavLink>

        <ul className="Navlinks">
          <li>
            <NavLink to="/Login">Log In</NavLink>
          </li>
          <li>
            <NavLink to="/Signup">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
