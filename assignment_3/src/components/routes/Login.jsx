import { useContext, useState } from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Authentication";
import Cookies from 'js-cookie';

const APIKEY =
  "f244eab81fcfb8dffadb998553d964337c6ed64984398fa6e96d6bd39387ae0917";

export default function Login() {
  //initialize state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false); // State to handle redirection
  //initalize context variables
  const { setIsAuth, setApiKey } = useContext(AuthContext);

  //Function to handleSubmit
  function handleSubmit(event) {
    event.preventDefault();
    setErrors({});

    //Add simple logic for empty fields
    if (username === "" || password === "") {
      setErrors({
        empty_username: username === "" ? "Please provide a username" : "",
        empty_password: password === "" ? "Please provide a password" : "",
      });
    } else {
      setApiKey(APIKEY); //set API Key in context
      setIsAuth(true); //Set user as authenticated
      setRedirect(true); // Set redirect to true to trigger navigation
      
    }
  }

  if(redirect) {
    return <Navigate to = "/MyAccount/Watchlist"/> //redirect user to account page
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="username">
        {/* username input */}
        <label htmlFor="username">Username:</label>
        <input
          className="login-input"
          type="text"
          id="username"
          name="username"
          size="25"
          value={username}
          onChange={(ev) => {
            setUsername(ev.target.value);
          }}
        />
        {/* Add error checks and display for username */}
        {errors.empty_username && (
          <span className="error">{errors.empty_username}</span>
        )}
      </div>
      <div className="password">
        {/* password input */}
        <label htmlFor="password">Password:</label>
        <input
          className="login-input"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        {/* Add error checks and display for password */}
        {errors.empty_password && (
          <span className="error">{errors.empty_password}</span>
        )}
        {errors.invalid_credentials && (
          <span className="error">{errors.invalid_credentials}</span>
        )}
      </div>
      <button id="submit" name="submit" type="submit">
        Login
      </button>
      <Link to={"/SignUp"}>Create-Account</Link>
    </form>
  );
}
