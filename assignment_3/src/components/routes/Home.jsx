import MovieGrid from "../MovieGrid";
import { useState, useEffect } from "react";

function Home() {
  const [MovieList, setMovieList] = useState([]);
  let url =
    "https://loki.trentu.ca/~cameronvoncriegern/3430/assn/assignment2/api/movies";
  // "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois3430-2024su-a2-Molayo-0/api/movies/";

  async function fetchMovies() {
    const resp = await fetch(url);
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    setMovieList(movies);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <MovieGrid movies={MovieList} />
    </>
  );
}

export default Home;
