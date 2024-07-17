// individual movie page (all details)
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Movie.css";

function Movie() {
  const params = useParams();

  let url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/${params.id}`;

  const [movie, setMovie] = useState([]);

  async function fetchMovies() {
    const resp = await fetch(url);
    const jsonResponse = await resp.json();
    const movieresp = jsonResponse;
    setMovie(movieresp);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div>
        <h3>{movie.Title}</h3>
        <img src={movie.Poster} />
        <p>{movie.Vote_average}</p>
      </div>
    </>
  );
}

export default Movie;
