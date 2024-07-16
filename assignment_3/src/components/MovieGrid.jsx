import "../styles/MovieGrid.css";
import MovieCard from "./MovieCard";
import Nav from "./Nav";

function MovieGrid({ movies }) {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <h1>Home Page</h1>
        {movies.map((movie) => (
          <MovieCard title={movie.title} key={movie.id} id={movie.id} />
        ))}
      </main>
    </>
  );
}

export default MovieGrid;
