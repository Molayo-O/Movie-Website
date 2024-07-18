// individual movie page (all details)
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
        <div className="Heading-Container">
          <div className="Heading">
            <h1 className="Title">{movie.Title}</h1>
            <h3>Release Date: {movie.Release_Date}</h3>
          </div>
          <div className="WatchListAdd">
            <button>
              <FontAwesomeIcon className="addIcon" icon={faPlus} /> Add to WatchList
            </button>
          </div>
        </div>
        <div className="movieCard">
          <img src={movie.Poster} alt="Movie Poster" />
          <div className="movieContent">
            <ul className="Genres">
              {/* display movie genres */}
              {genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <p className="Tagline">{movie.Tagline}</p>
            <p>{movie.Overview}</p>
            <p className="rating-container">
              <FontAwesomeIcon className="starsDetail" icon={faStar} />
              <strong>{movie.Vote_average}</strong>/10
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Movie;
