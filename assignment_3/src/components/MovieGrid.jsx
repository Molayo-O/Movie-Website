import "../styles/MovieGrid.css";
import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <>
      <div className="MovieGrid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.movieid} />
        ))}
      </div>
    </>
  );
}

export default MovieGrid;
