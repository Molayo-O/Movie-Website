import "../styles/MovieCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { QuickAddButton } from "./QuickAddButton";
function MovieCard({ movie, setError, setSuccess }) {
  return (
    <>
      <div className="MovieCard">
        <Link id="Poster" to={`/movie/${movie.movieID}`}>
          <img src={movie.Poster} />
          <div className="text">
            <h3 className="lora movieTitle">{movie.Title}</h3>

            <FontAwesomeIcon className="stars" icon={faStar} />
            <p id="rating" className="lora">
              {movie.Vote_average}
            </p>
          </div>
        </Link>
        <QuickAddButton
          movie={movie}
          setError={setError}
          setSuccess={setSuccess}
        />
      </div>
    </>
  );
}

export default MovieCard;
