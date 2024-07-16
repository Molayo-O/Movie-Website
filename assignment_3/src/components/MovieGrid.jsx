import "../styles/MovieGrid.css";
import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <>
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.movieid} />
      ))}
    </>
  );
}

export default MovieGrid;
