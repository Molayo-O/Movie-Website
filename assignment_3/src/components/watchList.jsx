import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authentication";
import MovieGrid from "./MovieGrid";

export default function WatchList() {
  // Authentication
  const { apiKey } = useContext(AuthContext);
  // const { isAuth } = useContext(AuthContext);

  // ******************

  const [MovieList, setMovieList] = useState([]);

  // fetch movie list with api key
  async function fetchMovies(apikey) {
    let baseUrl =
      "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries";
    const resp = await fetch(baseUrl, {
      headers: { "X-API-Key": apikey },
    });
    const jsonResponse = await resp.json();
    console.log(jsonResponse);
    const movies = jsonResponse;
    setMovieList(movies);
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
  }, []);

  return (
    <>
      <div style={{ color: "white" }}>Your API Key is {apiKey}</div>;
      <MovieGrid movies={MovieList} />
    </>
  );
}
