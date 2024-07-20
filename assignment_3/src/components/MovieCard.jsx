import "../styles/MovieCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function MovieCard({ movie }) {
  return (
    <>
      <div className="MovieCard">
        <Link to={`/movie/${movie.movieID}`}>
          <img src={movie.Poster} />
          <div className="text">
            <h3 className="lora movieTitle">{movie.Title}</h3>
            <FontAwesomeIcon className="stars" icon={faStar} />
            <p className="lora">{movie.Vote_average}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default MovieCard;
