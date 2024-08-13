import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Authentication";

function Nav() {
  //Add auth Context
  const { isAuth, setIsAuth, setApiKey } = useContext(AuthContext);

  //function to handle logout
  const handleLogout = () => {
    setIsAuth(false);
    setApiKey(null);
  };

  return (
    <>
      <nav className="Navbar">
        <NavLink to="/">
          <h1>Watched It</h1>
        </NavLink>

        {/* Conditionally render links based on Auth */}

        <ul className="Navlinks">
          <li>
            <NavLink to="/">Films</NavLink>
          </li>
          {isAuth ? (
            <>
              <li>
                <NavLink to="/MyAccount/UserStats">MyAccount</NavLink>
              </li>
              <li>
                <NavLink to="/MyAccount/Watchlist">Watchlist</NavLink>
              </li>
              <li>
                <NavLink to="/MyAccount/CompletedWatchList">
                  Film Journal
                </NavLink>
              </li>
              <li>
                <NavLink to="/Login" onClick={handleLogout}>
                  Log Out
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/Login">Log In</NavLink>
              </li>
              <li>
                <NavLink to="/Signup">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
