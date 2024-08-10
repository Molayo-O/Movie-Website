import "../styles/MovieGrid.css";
import ToWatchCard from "./ToWatchCard";

function ToWatchGrid({ movies, setError, setSuccess, DeleteMovie, handleWatchedItClick }) {
  return (
    <>
      <div className="MovieGrid">
        {movies.map((movie) => (
          <ToWatchCard
            movie={movie}
            key={movie.movieID}
            setError={setError}
            setSuccess={setSuccess}
            DeleteMovie = {DeleteMovie}
            handleWatchedItClick={handleWatchedItClick}
          />
        ))}
      </div>
    </>
  );
}

export default ToWatchGrid;