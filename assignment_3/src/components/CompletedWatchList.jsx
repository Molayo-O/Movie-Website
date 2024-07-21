import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Authentication";
import MovieGrid from "./MovieGrid";
import "../styles/completedWatch.css";

export default function CompletedWatchlist() {
  //initalize state variables
  const [List, setMovieList] = useState([]);
  const { apiKey } = useContext(AuthContext);

  //define function to fetch all completed movies
  async function fetchCompletedMovies() {
    let baseUrl =
      "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/completedwatchlist/entries";
    const resp = await fetch(baseUrl, { headers: { "X-API-Key": apiKey } });
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    setMovieList(movies);
    console.log(movies);
  }

  useEffect(() => {
    fetchCompletedMovies();
  }, []);
  return (
    <table className="CompletedWatch">
      <thead>
        <tr>
          <th>Initially Watched</th>
          <th>Last Watched</th>
          <th>Movie</th>
          <th>Release Date</th>
          <th>Rating</th>
          <th>Times-Watched</th>
        </tr>
      </thead>
      <tbody>
        {List.map((movie) => (
          <tr key={movie.movieID}>
            <td>{movie.Initially_Watched}</td>
            <td>{movie.Last_Watched}</td>
            <td>
              <div className="movie-container">
                <img src={movie.Poster} alt="movie Poster" />
                <h4>{movie.Title}</h4>
              </div>
            </td>
            <td>{movie.Release_Date}</td>
            <td>{movie.rating}</td>
            <td>{movie.Times_watched}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
