// individual movie page (all details)
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Movie.css";

function Movie() {
  const params = useParams();

  let url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/${params.id}`;

  const [movie, setMovie] = useState([]); //Initialize movie array
  const [genres, setGenres] = useState([]); //Initialize genres array

  //Function to fetch specific movie
  async function fetchMovies() {
    const resp = await fetch(url);
    const jsonResponse = await resp.json();
    const movieresp = jsonResponse;
    //update state variables
    setMovie(movieresp);
    setGenres(JSON.parse(movieresp.Genres));
    console.log(movieresp);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <section className="MovieDetails">
        <h1>{movie.Title}</h1>
        <div className="movieCard">
          <img src={movie.Poster} alt="Movie Poster" />
          <p>{movie.Vote_average}</p>
          <ul>
            {/* display movie genres */}
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p>{movie.Overview}</p>
        </div>
      </section>
    </>
  );
}

export default Movie;
