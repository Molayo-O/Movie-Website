import MovieGrid from "../MovieGrid";
import { useState, useEffect } from "react";

function Home() {
  const [MovieList, setMovieList] = useState([]);
  let url =
    "https://loki.trentu.ca/~cameronvoncriegern/3430/assn/assignment2/api/movies";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setMovieList(json));
  }, []);

  return (
    <>
      <MovieGrid movies={MovieList} />
    </>
  );
}

export default Home;
