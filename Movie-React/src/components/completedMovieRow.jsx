import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "../styles/completedWatch.css";

const MovieRow = ({ movie, updateMovieDetail, handleEditClick }) => {
  const [score, setScore] = useState(movie.rating);
  const [timesWatched, setTimesWatched] = useState(movie.Times_watched);

  useEffect(() => {
    setScore(movie.rating);
    setTimesWatched(movie.Times_watched);
  }, [movie.rating, movie.Times_watched]);

  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
      if (score !== movie.rating) { //Avoid unnecessary updates
        updateMovieDetail(movie.movieID, "rating", score);
      }
    }, 2000); // Update after 2 seconds of no changes

    return () => {
      clearTimeout(delayInputTimeout);
    };
  }, [score, movie.movieID, updateMovieDetail]);

  function handleScore(event) {
    setScore(event.target.value);
  }

  function handleTimesWatched() {
    const newTimesWatched = timesWatched + 1;
    setTimesWatched(newTimesWatched);
    updateMovieDetail(movie.movieID, "times-watched", newTimesWatched);
  }

  return (
    <tr key={movie.movieID}>
      <td>{movie.Last_Watched}</td>
      <td>
        <div className="movie-container">
          <img src={movie.Poster} alt="movie poster" />
          <Link to={`/movie/${movie.movieID}`}>
            <h4>{movie.Title}</h4>
          </Link>
        </div>
      </td>
      <td>{movie.Release_Year}</td>
      <td className="display-rating">
        {score}
        <input
          className="rating-input"
          type="range"
          id={`score-for-movie-${movie.movieID}`}
          value={score}
          step={0.1}
          min={0}
          max={10}
          onChange={handleScore}
        />
      </td>
      <td>{movie.notes}</td>
      <td className="display-side">
        {timesWatched}
        <button onClick={handleTimesWatched}>+</button>
      </td>
      <td>
        <FontAwesomeIcon
          onClick={() => handleEditClick(movie)}
          className="edit-icon"
          icon={faPenToSquare}
        />
      </td>
    </tr>
  );
};

export default MovieRow;
