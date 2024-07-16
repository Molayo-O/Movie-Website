// individual movie page (all details)
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Movie() {
  const params = useParams();

  let url = `https://loki.trentu.ca/~cameronvoncriegern/3430/assn/assignment2/api/movies/${params.id}`;

  const [movie, setMovie] = useState([]);

  async function fetchMovies() {
    const resp = await fetch(url);
    const jsonResponse = await resp.json();
    const movieresp = jsonResponse;
    setMovie(movieresp[0]);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="MovieCard">
        <h3>{movie.title}</h3>
        <img src={movie.poster} />
        <p>{movie.vote_average}</p>
        <Link to={`/movie/${movie.movieid}`}>More Info</Link>
      </div>
    </>
  );
}

export default Movie;
