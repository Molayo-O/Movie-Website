import "../styles/MovieCard.css";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
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

export default MovieCard;
