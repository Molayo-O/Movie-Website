import { useContext, useState } from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Authentication";
// import Cookies from "js-cookie";

export default function Login() {
  //initialize state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false); // State to handle redirection

  //initalize context variables
  const { setIsAuth, setApiKey } = useContext(AuthContext);

  //Function to handle Login
  async function handleLogin(username, password) {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch(
        "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/authentication/login",
        {
          method: "POST",
          // headers: {
          // },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Set API Key in context
        setApiKey(result.apiKey);
        // Set user as authenticated
        setIsAuth(true);
        // Set redirect to true to trigger navigation
        setRedirect(true);
      } else {
        setErrors(result.errors);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors({ error: "An error occurred. Please try again" });
    }
  }

  function handleTestUser() {
    handleLogin("testUser", "qwertyuiop1234567890");
  }
  //Function to handleSubmit
  function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    handleLogin(username, password);
  }

  if (redirect) {
    return <Navigate to="/MyAccount/Watchlist" />; //redirect user to account page
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="Login-Heading">Login</h1>
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
      <button type="button" className="test-btn" onClick={handleTestUser}>
        Continue as Guest
      </button>
      <Link to={"/SignUp"}>Create-Account</Link>
    </form>
  );
}
