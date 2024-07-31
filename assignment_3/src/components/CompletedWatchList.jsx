import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Authentication";
import MovieRow from "./completedMovieRow";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import "../styles/completedWatch.css";

export default function CompletedWatchlist() {
  //initalize state variables
  const [List, setMovieList] = useState([]);
  const { apiKey } = useContext(AuthContext);

  //define function to fetch all completed movies
  async function fetchCompletedMovies() {
    let baseUrl =
      "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/completedwatchlist/entries";
    const resp = await fetch(baseUrl, {
      headers: { "X-API-Key": apiKey },
    });
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    setMovieList(movies);
  }

  useEffect(() => {
    fetchCompletedMovies();
  }, []);

  //define function to update movie properties
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
      // body: JSON.stringify({ [endpoint]: newValue }),
    });

    const response = await resp.json();
    // If the response is successful, update the movieList with the updated value
    if (response.status >= 200 && response.status < 300) {
      // Iterate to update the corresponding movieID
      const newMovieList = List.map((movie) => {
        if (movie.movieID === movieId) {
          return { ...movie, [endpoint]: newValue };
        } else {
          return movie;
        }
      });
      setMovieList(newMovieList); //Update state variable
    }
  }

  return (
    <Fragment>
      <h1 className="Heading">Completed WatchList</h1>
      <h3>Sorted By Highest Rated</h3>
      <table className="CompletedWatch">
        <thead>
          <tr>
            <th>Initially Watched</th>
            <th>Last Watched</th>
            <th>Movie</th>
            <th>Release Date</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Times-Watched</th>
          </tr>
        </thead>
        <tbody>
          {List.map((movie) => (
            <MovieRow
              key={movie.movieID}
              movie={movie}
              updateMovieDetail={updateMovieDetail}
            />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
