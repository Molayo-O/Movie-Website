import { useState, useEffect } from "react";
import SearchForm from "../searchForm";

export default function Login() {
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
    const resp = await fetch(baseUrl, 
        { headers: { "X-API-Key": "hi" } });
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    setMovieList(movies);
  }
  return <></>;
}
