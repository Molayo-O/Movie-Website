import MovieGrid from "../MovieGrid";
import { useState, useEffect } from "react";
import SearchForm from "../searchForm";
import FilterGenre from "../FilterGenre";

function Home() {
  //initalize state variables
  const [MovieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreType, setGenreType] = useState("");
  //define function to fetch all movies
  async function fetchMovies() {
    let baseUrl =
      "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/";
    const resp = await fetch(baseUrl, { headers: { "X-API-Key": "hi" } });
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    setMovieList(movies);
  }

  //define function to fetch specifc movies
  async function fetchSpecificMovie(title) {
    const url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/?title=${title}`;
    const resp = await fetch(url, { headers: { "X-API-Key": "hi" } });
    const jsonResponse = await resp.json();
    //Dynamically update state based on fetched data
    setMovieList(jsonResponse.length > 0 ? jsonResponse : []);
  }

  //On searchTerm change, dynamically render movies based on title, if defined
  useEffect(() => {
    if (searchTerm) {
      fetchSpecificMovie(searchTerm);
    } else {
      fetchMovies();
    }
  }, [searchTerm]);

  async function fetchMovieByGenre(genreType) {
    let baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/genre?=${genreType}`;
    const resp = await fetch(baseUrl, { headers: { "X-API-Key": "hi" } });
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    setMovieList(movies);
  }

  useEffect(() => {
    if (genreType) {
      fetchMovieByGenre(genreType);
    } else {
      fetchMovies();
    }
  }, [genreType]);

  //Function to handleSubmit
  function getMovies(searchFor) {
    setSearchTerm(searchFor);
  }

  function getGenreMovies(searchGenre) {
    setGenreType(searchGenre);
  }

  return (
    <>
      <FilterGenre searchGenre={getGenreMovies} />
      <SearchForm search={getMovies} />
      <MovieGrid movies={MovieList} />
    </>
  );
}

export default Home;
