import MovieGrid from "../MovieGrid";
import { useState, useEffect } from "react";
import "../../styles/Home.css";
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
  const pageSize = 42;

  // Fetch movies based on search term, genre, and current page
  async function fetchMovies(currentpage) {
    let baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/?page=${currentpage}&limit=${pageSize}`;
    if (searchTerm) {
      baseUrl += `&title=${searchTerm}`;
    } else if (genreType && genreType !== "x") {
      baseUrl += `&genres=${genreType}`;
    }
    const resp = await fetch(baseUrl, { headers: { "X-API-Key": "hi" } });
    const jsonResponse = await resp.json();
    setMovieList(jsonResponse);
  }

  //On searchTerm change, dynamically render movies based on all state variables
  useEffect(() => {
    fetchMovies(currentPage);
  }, [searchTerm, genreType, currentPage]);

  //Function to handleSubmit
  function getMovies(searchFor) {
    setSearchTerm(searchFor);
    //reset pages
    setCurrentPage(1);
  }

  function getGenreMovies(searchGenre) {
    setGenreType(searchGenre);
    //reset pages
    setCurrentPage(1);
  }
  //Function to handle pagination
  function changePage(newPage) {
    setCurrentPage(newPage);
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
          <p>successfully added movie to watch list</p>
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
