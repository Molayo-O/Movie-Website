import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authentication";
import ToWatchGrid from "./ToWatchGrid";
import AddCompletedWatchForm from "./AddCompletedWatchForm";
import Filters from "./Filters";
import "../styles/ToWatchList.css";

export default function WatchList() {
  const { apiKey } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [MovieList, setMovieList] = useState([]);
  const [genreType, setGenreType] = useState("");
  const [ratingOrder, setRatingOrder] = useState("");
  const [year, setYear] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [orderPriority, setOrderPriority] = useState("ASC");

  // Fetch movie list with API key
  async function fetchMovies(apikey) {
    let baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries?orderPriority=${orderPriority}`;
    if (genreType && genreType !== "x") baseUrl += `&genres=${genreType}`;
    if (ratingOrder && ratingOrder !== "x")
      baseUrl += `&orderRating=${ratingOrder}`;
    if (year && year !== "x") baseUrl += `&year=${year}`;

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
  }, [genreType, ratingOrder, year, apiKey, orderPriority]);

  async function DeleteMovie(movieID) {
    const url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries/${movieID}`;
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        "X-API-Key": apiKey,
      },
    });

    if (resp.ok) {
      setMovieList(MovieList.filter((movie) => movie.movieID !== movieID));
    } else {
      console.error("Failed to delete movie");
    }
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

  function getMoviesByPriority(Priorityorder) {
    setOrderPriority(Priorityorder);
  }

  function handleFailureClose() {
    setFailure(false);
  }

  function handleSuccessClose() {
    setSuccess(false);
  }

  function SuccessTrue() {
    setSuccess(true);
  }

  function FailureTrue() {
    setFailure(true);
  }

  function handleWatchedItClick(movie) {
    setSelectedMovie(movie);
    setIsFormVisible(true);
  }

  function handleFormClose() {
    setIsFormVisible(false);
    setSelectedMovie(null);
  }

  return (
    <>
      {success && (
        <div className="success">
          <p>Successfully added movie to completed watch list</p>
          <button onClick={handleSuccessClose}>X</button>
        </div>
      )}
      {failure && (
        <div className="failure">
          <p>Failed to Add Movie</p>
          <button onClick={handleFailureClose}>X</button>
        </div>
      )}
      <div className="filters-watchlist-container">
        <div className="Headings-toWatch">
          <h3 className="Heading">My WatchList</h3>
          <h3>
            You want to watch{" "}
            {MovieList.length > 1
              ? MovieList.length + " Films"
              : MovieList.length + " Film"}
          </h3>{" "}
        </div>
        <Filters
          getGenreMovies={getGenreMovies}
          getMoviesByRating={getMoviesByRating}
          getMoviesByYear={getMoviesByYear}
          getMoviesByPriority = {getMoviesByPriority}
        />
      </div>
      <ToWatchGrid
        movies={MovieList}
        setError={setFailure}
        setSuccess={setSuccess}
        DeleteMovie={DeleteMovie}
        handleWatchedItClick={handleWatchedItClick}
      />
      {isFormVisible && selectedMovie && (
        <AddCompletedWatchForm
          movie={selectedMovie}
          DeleteFromToWatch={DeleteMovie}
          Success={SuccessTrue}
          Failed={FailureTrue}
          onClose={handleFormClose}
        />
      )}
    </>
  );
}
