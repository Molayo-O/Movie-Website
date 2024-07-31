import MovieGrid from "../MovieGrid";
import { useState, useEffect } from "react";
import SearchForm from "../searchForm";
import FilterGenre from "../FilterGenre";

function Home() {
  //initalize state variables
  const [MovieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreType, setGenreType] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 54;

  //define function to fetch all movies
  async function fetchMovies(currentpage) {
    let baseUrl =
      `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/?page=${currentpage}&limit=${pageSize}`;
    const resp = await fetch(baseUrl, { headers: { "X-API-Key": "hi" } });
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    setMovieList(movies);
  }

  //define function to fetch specifc movies
  async function fetchSpecificMovie(title, currentpage) {
    const url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/?title=${title}&page=${currentpage}&limit=${pageSize}`;
    const resp = await fetch(url, { headers: { "X-API-Key": "hi" } });
    const jsonResponse = await resp.json();
    //Dynamically update state based on fetched data
    setMovieList(jsonResponse.length > 0 ? jsonResponse : []);
  }

  //On searchTerm change, dynamically render movies based on title, if defined
  useEffect(() => {
    if (searchTerm) {
      fetchSpecificMovie(searchTerm, currentPage);
    } else {
      fetchMovies(currentPage);
    }
  }, [searchTerm]);

  async function fetchMovieByGenre(genreType, currentpage) {
    let baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/?genres=${genreType}&page=${currentpage}&limit=${pageSize}`;
    const resp = await fetch(baseUrl, { headers: { "X-API-Key": "hi" } });
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    setMovieList(movies);
  }

  useEffect(() => {
    if (genreType && genreType != "x") {
      fetchMovieByGenre(genreType, currentPage);
    } else {
      fetchMovies(currentPage);
    }
  }, [genreType]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  //Function to handleSubmit
  function getMovies(searchFor) {
    setSearchTerm(searchFor);
  }

  //Function to handle pagination
  function changePage(newPage) {
    //validate pageNumber
    setCurrentPage(newPage);
  }

  function getGenreMovies(searchGenre) {
    setGenreType(searchGenre);
  }
  function closeError() {
    setError(false);
  }

  function errorTrue() {
    setError(true);
  }

  function successTrue() {
    setSuccess(true);
  }
  function closeSuccess() {
    setSuccess(false);
  }

  return (
    <>
      {success && (
        <div className="success">
          <p>successfully added movie to completed watch list</p>
          <button onClick={closeSuccess}>X</button>
        </div>
      )}
      {error && (
        <div className="failure">
          <p>Failed! Movie Already In WatchList</p>
          <button onClick={closeError}>X</button>
        </div>
      )}
      <FilterGenre searchGenre={getGenreMovies} />
      <SearchForm search={getMovies} />
      <MovieGrid
        movies={MovieList}
        setError={errorTrue}
        setSuccess={successTrue}
      />
      <div className="pagination">
        {/* Change page to previous, disable button if below 1 */}
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        {/* Change page to next */}
        <button onClick={() => changePage(currentPage + 1)}>
          Next
        </button>
      </div>
    </>
  );
}

export default Home;
