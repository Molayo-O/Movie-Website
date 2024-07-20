import { useState, useEffect } from "react";
import SearchForm from "../searchForm";
import "../../styles/login.css";
import { Link } from "react-router-dom";

export default function Login({ setApiKey }) {
  //initialize state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //Function to handleSubmit
  function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
  }

  //define function to fetch authentication API
  async function fetchAPIAuth() {
    let baseUrl =
      "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/endpoints/login-api";
    const resp = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //Convert state values to JSON
      body: JSON.stringify({ username, password }),
    });
    // headers: { "X-API-Key": "hi" }
    const jsonResponse = await resp.json();

    //if api responds with errors
    if (jsonResponse.errors) {
      setErrors(jsonResponse.errors);
    }
    //else we retrieve the API key from fetch and pass to state variable
    else {
      setApiKey(jsonResponse.apiKey);
    }
  }

  useEffect(() => {
    fetchAPIAuth();
  }, [username]);

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
