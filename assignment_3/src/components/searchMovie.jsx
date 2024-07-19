import { useState, useEffect } from "react";
import MovieGrid from "./MovieGrid";
import SearchForm from "./searchForm";
import MovieCard from "./MovieCard";

export default function SearchMovie() {
  const [Movies, SetMovies] = useState([]);
  const [searchFor, SetSearchFor] = useState("");

  //function to retrieve specific movie
  async function myEffect() {
    //condition to check if movie title is inputted
    if (searchFor) {
      const baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/?title=${searchFor}`;
      const resp = await fetch(baseUrl);
      const jsonResponse = await resp.json();
      console.log(jsonResponse);
      SetMovies(jsonResponse);
    }
  }

  useEffect(() => {
    myEffect(searchFor);
  }, [searchFor]);

  function getMovie(name) {
    SetSearchFor(name);
  }
  return (
    <>
      <SearchForm search={getMovie} />
      <MovieGrid movies={Movies} />
    </>
  );
}
