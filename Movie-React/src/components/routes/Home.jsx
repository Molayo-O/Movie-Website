import MovieGrid from "../MovieGrid";
import { useState, useEffect, Fragment } from "react";
import SearchForm from "../searchForm";
import Filters from "../Filters";
import Pagination from "../Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Home.css";
import "../../styles/genres.css";

function Home() {
  // Initialize state variables
  const [MovieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noMovies, setNoMovies] = useState(false);
  const [genreType, setGenreType] = useState("");
  const [ratingOrder, setRatingOrder] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 42;

  // Fetch movies based on search term, genre, and current page
  async function fetchMovies() {
    let baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/?page=${currentPage}&limit=${pageSize}`;

    if (searchTerm) baseUrl += `&title=${searchTerm}`;
    if (genreType && genreType !== "x") baseUrl += `&genres=${genreType}`;
    if (ratingOrder && ratingOrder !== "x")
      baseUrl += `&orderRating=${ratingOrder}`;
    if (year && year !== "x") baseUrl += `&year=${year}`;

    try {
      const resp = await fetch(baseUrl, { headers: { "X-API-Key": "hi" } });
      const jsonResponse = await resp.json();

      // Determine if response returned any movie data
      if (jsonResponse.length === 0) {
        setNoMovies(true);
      } else {
        setNoMovies(false);
      }
      setMovieList(jsonResponse.movies);
      //Determine total pages
      setTotalPages(Math.ceil(jsonResponse.total / pageSize));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setNoMovies(true);
    }
  }

  // On searchTerm change, dynamically render movies based on all state variables
  useEffect(() => {
    fetchMovies();
  }, [searchTerm, genreType, currentPage, ratingOrder, year]);

  // Function to set search state variable
  function getMovies(searchFor) {
    setSearchTerm(searchFor);
    // Reset pages
    setCurrentPage(1);
  }

  // Function to set Genre state variable
  function getGenreMovies(searchGenre) {
    setGenreType(searchGenre);
    // Reset pages
    setCurrentPage(1);
  }

  // Function to set rating state variable
  function getMoviesByRating(order) {
    setRatingOrder(order);
    // Reset pages
    setCurrentPage(1);
  }

  // Function to set year state variable
  function getMoviesByYear(year) {
    setYear(year);
    // Reset pages
    setCurrentPage(1);
  }

  // Function to handle pagination
  function changePage(newPage) {
    //Scroll to top of the page
    window.scrollTo(0, 0);

    setCurrentPage(newPage);
  }

  function closeError() {
    setError(false);
  }

  //Add timeout to close message
  function errorTrue() {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 4000);
  }

  function successTrue() {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  }

  function closeSuccess() {
    setSuccess(false);
  }

  return (
    <>
      <div className="display-message-container">
        {success && (
          <div className={`success ${success ? "display" : ""}`}>
            <p>Successfully added movie to watch list</p>
            <button onClick={closeSuccess}>
              <FontAwesomeIcon className="x-icon" icon={faX} />
            </button>
          </div>
        )}
        {error && (
          <div className={`failure ${error ? "display" : ""}`}>
            <p>Failed, Movie Already In WatchList</p>
            <button onClick={closeError}>
              <FontAwesomeIcon className="x-icon" icon={faX} />
            </button>
          </div>
        )}
      </div>
      <div className="filters-container">
        <Filters
          getGenreMovies={getGenreMovies}
          getMoviesByRating={getMoviesByRating}
          getMoviesByYear={getMoviesByYear}
        />
        <SearchForm search={getMovies} />
      </div>
      {noMovies ? (
        <div className="noMovies-message">
          <p>No movies were found that met the criteria.</p>
        </div>
      ) : (
        <Fragment>
          <MovieGrid
            movies={MovieList}
            setError={errorTrue}
            setSuccess={successTrue}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            changePage={changePage}
          />
        </Fragment>
      )}
    </>
  );
}

export default Home;
