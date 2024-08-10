import "../styles/MovieCard.css";
import "../styles/ToWatchList.css";
import { Link } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import AddCompletedWatchForm from "./AddCompletedWatchForm";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Authentication";

export default function ToWatchCard({
  movie,
  setError,
  setSuccess,
  DeleteMovie,
  handleWatchedItClick,
}) {
  const [priority, setPriority] = useState(movie.priority);
  const { apiKey } = useContext(AuthContext);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const ImageStyle = {
    backgroundImage: `url(${movie.Poster})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "12em",
    height: "18.5em",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  };

  function HandleDelete() {
    DeleteMovie(movie.movieID);
  }

  function changePriority(ev) {
    const newPriority = ev.target.value;
    setPriority(newPriority);
    updatePriority(movie.movieID, newPriority);
  }

  async function updatePriority(movieId, newPriority) {
    const url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries/${movieId}/priority`;
    const formData = new URLSearchParams();
    formData.append("priority", newPriority);
    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        "X-API-Key": apiKey,
      },
      body: formData,
    });
  }

  useEffect(() => {
    setPriority(movie.priority); // Initialize state with movie's priority
  }, [movie.priority]);

  return (
    <div className="MovieCard" style={ImageStyle}>
      <ul className="quick-actions">
        <li onFocus={() => setIsInputVisible(true)} id="priority-icon">
          {priority}
          <input
            type="number"
            value={priority}
            onChange={changePriority}
            min="1"
            max="10"
            step="1"
          />
        </li>
        <li onClick={() => handleWatchedItClick(movie)}>
          <FontAwesomeIcon className="seen" icon={faCheck} />
          <span>Watched It!</span>
        </li>
        <li onClick={HandleDelete}>
          <FontAwesomeIcon className="remove-icon" icon={faTrash} />
          <span>Delete Movie</span>
        </li>
        <li>
          <Link to={`/movie/${movie.movieID}`}>
            <FontAwesomeIcon
              className="movie-detail-icon"
              icon={faCircleInfo}
            />
          </Link>
          <span>Movie info</span>
        </li>
      </ul>
      <div className="text">
        <h3 className="lora toWatchTitle">{movie.Title}</h3>
      </div>
    </div>
  );
}
