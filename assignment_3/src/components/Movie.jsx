// individual movie page (all details)
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStar2 } from "@fortawesome/free-regular-svg-icons";
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
          </div>
          <div className="WatchListAdd">
            <button>
              <FontAwesomeIcon className="addIcon" icon={faPlus} /> Add to
              WatchList
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
            <p className="Tagline">
              {movie.Tagline ? movie.Tagline : "Synopsis"}
            </p>
            <p>{movie.Overview}</p>
            <ul className="moreDetails">
              <li>
                <span>Release Date:</span> {movie.Release_Date}
              </li>
              <li>
                <span>Runtime:</span> {movie.Runtime}min
              </li>
            </ul>
            <ul className="rating-container">
              <li className="rating">
                <FontAwesomeIcon className="starsDetail" icon={faStar} />
                <span>
                  <strong>{movie.Vote_average}</strong>/10
                </span>
              </li>
              {/* Conditionally output count in k if greater than 1000 */}
              <li className="rating">
                <span>Vote Count{" "}</span>
                {movie.Vote_count >= 1000
                  ? `${(movie.Vote_count / 1000).toFixed(1)}k`
                  : movie.Vote_count}
              </li>
              <li className="rating">
                <FontAwesomeIcon icon={faStar2} />
                Rate
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Movie;
