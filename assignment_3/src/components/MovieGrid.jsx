import "../styles/MovieGrid.css";
import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <>
      <h1>Home Page</h1>
      {movies.map((movie) => (
        <MovieCard title={movie.title} key={movie.id} id={movie.id} />
      ))}
    </>
  );
}

export default MovieGrid;
