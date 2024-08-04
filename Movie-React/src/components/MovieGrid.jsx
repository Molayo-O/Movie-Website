import "../styles/MovieGrid.css";
import MovieCard from "./MovieCard";

function MovieGrid({ movies, setError, setSuccess }) {
  return (
    <>
      <div className="MovieGrid">
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.movieID}
            setError={setError}
            setSuccess={setSuccess}
          />
        ))}
      </div>
    </>
  );
}

export default MovieGrid;
