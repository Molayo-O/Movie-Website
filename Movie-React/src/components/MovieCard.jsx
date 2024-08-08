import "../styles/MovieCard.css";
import { Link } from "react-router-dom";
import { QuickAddButton } from "./QuickAddButton";

function MovieCard({ movie, setError, setSuccess }) {
  const ImageStyle = {
    backgroundImage: `url(${movie.Poster})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "12em",
    height: "18.5em",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  };

  return (
    <div className="MovieCard" style={ImageStyle}>
      <div className="text">
        <h3 className="lora movieTitle">{movie.Title}</h3>
        <div className="buttons">
          <Link id="moreInfo" to={`/movie/${movie.movieID}`}>
            More Info
          </Link>
          <QuickAddButton
            movie={movie}
            setError={setError}
            setSuccess={setSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
