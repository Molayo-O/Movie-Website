import { useContext, useState } from "react";
import "../../styles/login.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../Authentication";

export default function SignUp() {
  //initialize state variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);

  //function to handle Account Creation
  async function handleAccount() {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password1", password1);
    formData.append("password2", password2);

    try {
      const response = await fetch(
        "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/authentication/createAccount",
        {
          method: "POST",
          // headers: {
          // },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Set redirect to true to trigger navigation
        setRedirect(true);
      } else {
        //retrieve errors from api response
        setErrors(result.errors);
      }
    } catch (error) {
      console.error("Error creating Account:", error);
      setErrors({ error: "An error occurred. Please try again" });
    }
  }

  if (redirect) {
    return <Navigate to="/Login" />; // Redirect user to login page
  }

  // Function to handleSubmit
  function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    handleAccount();
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
        {errors.invalid_username && (
          <span className="error">{errors.invalid_username}</span>
        )}
        {errors.user_found && (
          <span className="error">{errors.user_found}</span>
        )}
      </div>
      <div className="email">
        {/*email input*/}
        <label htmlFor="email">Email:</label>
        <input
          className="login-input"
          type="email"
          id="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        {/* Add error checks and display for email */}
        {errors.empty_email && (
          <span className="error">{errors.empty_email}</span>
        )}
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="password">
        {/* Password input */}
        <label htmlFor="password">Password:</label>
        <input
          className="login-input"
          type="password"
          id="password"
          name="password"
          value={password1}
          onChange={(ev) => setPassword1(ev.target.value)}
        />
        {/* Add error checks and display for password */}
        {errors.p_strength && (
          <span className="error">{errors.p_strength}</span>
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
          value={password2}
          onChange={(ev) => setPassword2(ev.target.value)}
        />
        {errors.p_match && (
          <span className="error">{errors.password_match}</span>
        )}
      </div>
      <button id="submit" name="submit" type="submit">
        Sign Up
      </button>
      <Link to={"/Login"}>Already have an account? Log in</Link>
    </form>
  );
}
