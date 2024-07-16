import MovieGrid from "../MovieGrid";
import { useState, useEffect } from "react";

function Home() {
  const [MovieList, setMovieList] = useState([]);
  let url =
    // "https://loki.trentu.ca/~cameronvoncriegern/3430/assn/assignment2/api/movies";
    "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois3430-2024su-a2-Molayo-0/api/movies/";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        console.log("Response:", response);
        return response.json();
      })
      .then((json) => {
        console.log("JSON:", json);
        setMovieList(json);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [url]);

  return (
    <>
      <MovieGrid movies={MovieList} />
    </>
  );
}

export default Home;
