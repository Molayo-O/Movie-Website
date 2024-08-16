import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Authentication";
import MovieRow from "./completedMovieRow";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import { Fragment } from "react";
import AddCompletedWatchForm from "./AddCompletedWatchForm";
import "../styles/completedWatch.css";
import "../styles/ToWatchList.css";

export default function CompletedWatchlist() {
  // Initialize state variables
  const [List, setMovieList] = useState([]);
  const { apiKey } = useContext(AuthContext);
  const [genreType, setGenreType] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [ratingOrder, setRatingOrder] = useState("DESC");
  const [year, setYear] = useState("");
  const [date, setDateOrder] = useState("");
  const [timesOrder, setTimesWatchedOrder] = useState("");

  // Fetch all completed movies
  async function fetchMovies(apikey) {
    let baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/completedwatchlist/entries?orderRating=${ratingOrder}`;
    if (genreType && genreType !== "x") baseUrl += `&genres=${genreType}`;
    if (year && year !== "x") baseUrl += `&year=${year}`;
    if (timesOrder && timesOrder !== "x")
      baseUrl += `&orderRewatch=${timesOrder}`;
    if (date && date !== "x") baseUrl += `&orderDate=${date}`;

    const resp = await fetch(baseUrl, {
      headers: { "X-API-Key": apikey },
    });

    if (resp.ok) {
      const jsonResponse = await resp.json();
      setMovieList(jsonResponse);
    } else {
      console.error("Failed to fetch movies");
    }
  }

  useEffect(() => {
    fetchMovies(apiKey);
  }, [genreType, ratingOrder, year, timesOrder, date, apiKey]);

  // Update movie properties
  async function updateMovieDetail(movieId, endpoint, newValue) {
    const baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/completedwatchlist/entries/${movieId}/${endpoint}`;
    const formData = new URLSearchParams();
    formData.append(endpoint, newValue);
    const resp = await fetch(baseUrl, {
      method: "PATCH",
      headers: {
        "X-API-Key": apiKey,
      },
      body: formData,
    });

    if (resp.ok) {
      // Update the corresponding movieID
      const updatedList = List.map((movie) =>
        movie.movieID === movieId ? { ...movie, [endpoint]: newValue } : movie
      );
      setMovieList(updatedList); // Update state variable
    } else {
      console.log("Update failed");
    }
  }

  //Add timeout to close message
  function FailureTrue() {
    setFailure(true);
    setTimeout(() => {
      setFailure(false);
    }, 4000);
  }

  function SuccessTrue() {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  }

  function handleEditClick(movie) {
    setSelectedMovie(movie);
    setIsFormVisible(true);
  }

  function handleFormClose() {
    setIsFormVisible(false);
    setSelectedMovie(null);
  }

  function getGenreMovies(searchGenre) {
    setGenreType(searchGenre);
  }

  function getMoviesByRating(order) {
    setRatingOrder(order);
  }

  function getMoviesByYear(year) {
    setYear(year);
  }

  function getMoviesByDate(dateOrder) {
    setDateOrder(dateOrder);
  }

  function getMoviesByTimesWatched(numberOrder) {
    setTimesWatchedOrder(numberOrder);
  }

  //update movie state after form submission
  function updateMovieState(movieId, newNotes, newRating) {
    const updatedList = List.map((movie) =>
      movie.movieID === movieId
        ? { ...movie, notes: newNotes, rating: newRating }
        : movie
    );
    setMovieList(updatedList);
  }

  return (
    <Fragment>
      <div className="filters-watchlist-container">
        <div className="Headings-toWatch">
          <h3 className="Heading">My Logs</h3>
        </div>
        <Filters
          getGenreMovies={getGenreMovies}
          getMoviesByRating={getMoviesByRating}
          getMoviesByYear={getMoviesByYear}
          getMoviesByDate={getMoviesByDate}
          getMoviesByTimesWatched={getMoviesByTimesWatched}
        />
      </div>
      <table className="CompletedWatch">
        <thead>
          <tr>
            <th>Last Watched</th>
            <th>Movie</th>
            <th>Year Released</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Times-Watched</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {List.map((movie) => (
            <MovieRow
              key={movie.movieID}
              movie={movie}
              updateMovieDetail={updateMovieDetail}
              handleEditClick={handleEditClick}
              updateMovieState={updateMovieState}
            />
          ))}
        </tbody>
      </table>
      {isFormVisible && selectedMovie && (
        <AddCompletedWatchForm
          movie={selectedMovie}
          Success={SuccessTrue}
          Failed={FailureTrue}
          onClose={handleFormClose}
          updateMovieState={updateMovieState}
        />
      )}
    </Fragment>
  );
}
