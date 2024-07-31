import { useContext, useState } from "react";
import "../../styles/login.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../Authentication";

const APIKEY =
  "f244eab81fcfb8dffadb998553d964337c6ed64984398fa6e96d6bd39387ae0917";

export default function SignUp() {
  //initialize state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);

  // Initialize context variables
  const { setIsAuth, setApiKey } = useContext(AuthContext);

  // Function to handleSubmit
  function handleSubmit(event) {
    event.preventDefault();
    setErrors({});

    // Add simple logic for empty fields and password match
    if (username === "" || password === "" || confirmPassword === "") {
      setErrors({
        empty_username: username === "" ? "Please provide a username" : "",
        empty_password: password === "" ? "Please provide a password" : "",
        empty_confirmPassword:
          confirmPassword === "" ? "Please confirm your password" : "",
      });
    } else if (password !== confirmPassword) {
      setErrors({
        password_match: "Passwords do not match",
      });
    } else {
      setApiKey(APIKEY); // Set API Key in context
      setIsAuth(true); // Set user as authenticated
      setRedirect(true); // Set redirect to true to trigger navigation
    }
  }

  if (redirect) {
    return <Navigate to="/MyAccount/Watchlist" />; // Redirect user to account page
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="Login-Heading">Sign Up</h1>
      <div className="username">
        {/* Username input */}
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
        {/* Password input */}
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
        {errors.password_mismatch && (
          <span className="error">{errors.password_mismatch}</span>
        )}
      </div>
      <div className="confirm-password">
        {/* Confirm Password input */}
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          className="login-input"
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(ev) => setConfirmPassword(ev.target.value)}
        />
        {/* Add error checks and display for confirm password */}
        {errors.empty_confirmPassword && (
          <span className="error">{errors.empty_confirmPassword}</span>
        )}
      </div>
      <button id="submit" name="submit" type="submit">
        Sign Up
      </button>
      <Link to={"/Login"}>Already have an account? Log in</Link>
    </form>
  );
}
