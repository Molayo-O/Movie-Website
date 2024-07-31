import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/completedWatch.css";

const MovieRow = ({ movie, updateMovieDetail }) => {
  //Initialize state variables with current value in database
  const [score, setScore] = useState(movie.rating);
  const [timesWatched, setTimesWatched] = useState(movie.Times_watched);

  //function to handle score change
  function handleScore(event) {
    const newScore = event.target.value;
    setScore(newScore);
  }
  //function to handle times-Watched change
  function handleTimesWatched() {
    const newTimesWatched = timesWatched + 1;
    setTimesWatched(newTimesWatched);
    updateMovieDetail(movie.movieID, "times-watched", newTimesWatched);
  }

  return (
    <tr key={movie.movieID}>
      <td>{movie.Initially_Watched}</td>
      <td>{movie.Last_Watched}</td>
      <td>
        <div className="movie-container">
          <img src={movie.Poster} alt="movie poster" />
          <Link to={`/movie/${movie.movieID}`}>
            <h4>{movie.Title}</h4>
          </Link>
        </div>
      </td>
      <td>{movie.Release_Date}</td>
      <td className="display-rating">
        {movie.rating}
        <form
          className="rating-form"
          onSubmit={(event) => {
            event.preventDefault();
            updateMovieDetail(movie.movieID, "rating", score);
          }}
        >
          <input
            className="rating-input"
            type="number"
            id={`score-for-movie-${movie.movieID}`}
            value={score}
            step={0.5}
            min={0}
            max={10}
            onChange={handleScore}
          />
        </form>
      </td>
      <td>{movie.notes}</td>
      <td className="display-side">
        {timesWatched}
        <button onClick={handleTimesWatched}>+</button>
      </td>
    </tr>
  );
};

export default MovieRow;
