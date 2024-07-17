import "../styles/MovieCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function MovieCard({ movie }) {
  return (
    <>
      <div className="MovieCard">
        <Link to={`/movie/${movie.movieid}`}>
          <img src={movie.poster} />
          <div className="text">
            <h3>{movie.title}</h3>
            <FontAwesomeIcon className="stars" icon={faStar} />
            <p>{movie.vote_average}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default MovieCard;
