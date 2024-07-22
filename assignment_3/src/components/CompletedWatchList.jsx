import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Authentication";
import MovieGrid from "./MovieGrid";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import "../styles/completedWatch.css";

export default function CompletedWatchlist() {
  //initalize state variables
  const [List, setMovieList] = useState([]);
  const { apiKey } = useContext(AuthContext);
  const [score, setScore] = useState(0);

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
    console.log(movies);
  }

  //define function to update movie properties
  async function updateMovieDetail(movieId, endpoint, newValue) {
    const baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/completedwatchlist/entries/${movieId}/${endpoint}`;

    const resp = await fetch(baseUrl, {
      method: "PATCH",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [endpoint]: newValue }),
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

  useEffect(() => {
    fetchCompletedMovies();
  }, []);

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
                  <Link to={`/movie/${movie.movieID}`}>
                    <h4>{movie.Title}</h4>
                  </Link>
                </div>
              </td>
              <td>{movie.Release_Date}</td>
              <td>
                {movie.rating}
                <form
                  className="scoreForm"
                  onSubmit={(event) => {
                    event.preventDefault(); // Prevent form submission
                    updateMovieDetail(movie.movieID, "rating", score); // Pass the score value to the updateMovieDetail function
                  }}
                >
                  <input
                    type="number"
                    //Add unique id for each input field to avoid updating all movie ratings
                    id={`score for movie ${movie.movieID}`} 
                    value={score}
                    onChange={(event) => setScore(event.target.value)} // Update the score state based on user input
                  />
                </form>
              </td>
              <td className="display-side">
                {movie.Times_watched}
                <button
                  onClick={() =>
                    updateMovieDetail(
                      movie.movieID,
                      "times-watched",
                      movie.Times_watched + 1
                    )
                  }
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
