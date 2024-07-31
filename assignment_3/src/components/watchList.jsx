import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authentication";
import { WatchListTable } from "./WatchListTable";

export default function WatchList() {
  // Authentication
  const { apiKey } = useContext(AuthContext);
  // const { isAuth } = useContext(AuthContext);
  // ******************
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [MovieList, setMovieList] = useState([]);

  // fetch movie list with api key
  async function fetchMovies(apikey) {
    let baseUrl =
      "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries";
    const resp = await fetch(baseUrl, {
      headers: { "X-API-Key": apikey },
    });
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    setMovieList(movies);
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

  // delete from towatchlist

  // update priority of movie
  // async function UpdatePriority(apikey) {
  //   let baseUrl =
  //     "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries";
  //   const resp = await fetch(baseUrl, {
  //     headers: { "X-API-Key": apikey },
  //   });
  //   const jsonResponse = await resp.json();
  //   console.log(apikey);
  //   console.log(jsonResponse);
  //   const movies = jsonResponse;
  //   setMovieList(movies);
  // }

  useEffect(() => {
    fetchMovies(apiKey);
  }, [MovieList]);

  return (
    <>
      {success && (
        <div className="success">
          <p>successfully added movie to completed watch list</p>
          <button onClick={handleSuccessClose}>X</button>
        </div>
      )}
      {failure && (
        <div className="failure">
          <p>Failed to Add Movie</p>
          <button onClick={handleFailureClose}>X</button>
        </div>
      )}
      <WatchListTable
        movies={MovieList}
        Success={SuccessTrue}
        Failed={FailureTrue}
      />
    </>
  );
}
