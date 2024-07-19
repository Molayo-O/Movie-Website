import MovieGrid from "../MovieGrid";
import { useState, useEffect } from "react";
import SearchMovie from "../searchMovie";

function Home() {
  const [MovieList, setMovieList] = useState([]);
  let url =
    "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/";

  async function fetchMovies() {
    const resp = await fetch(url, { headers: { "X-API-Key": "hi" } });
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    setMovieList(movies);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <SearchMovie />
      <MovieGrid movies={MovieList} />
    </>
  );
}

export default Home;
