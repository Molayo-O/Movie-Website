import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "./Authentication";
import { useNavigate } from "react-router-dom";

export default function AddCompletedWatchForm({
  movie,
  DeleteFromToWatch,
  Success,
  Failed,
  onClose,
}) {
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const { apiKey } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleFullAdd = async (notes, rating) => {
    const formData = new URLSearchParams();
    formData.append("notes", notes);
    formData.append("rating", rating);

    try {
      let url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/completedwatchlist/entries/${movie.movieID}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      Success();
      DeleteFromToWatch(movie.movieID);
      onClose();
    } catch (error) {
      Failed();
    }
  };

  const handleNoteChange = (ev) => {
    setNotes(ev.target.value);
  };

  const changeRating = (ev) => {
    setRating(ev.target.value);
  };

  return (
    <div className="popup-form active">
      <div className="popup-form-content">
        <button className="close" onClick={onClose}>
          x
        </button>
        <div className="title-container">
          <p className="WatchListFont">I Watched: </p>
          <h2>{movie.Title}</h2>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleFullAdd(notes, rating);
          }}
        >
          <div className="container">
            <div className="Rating-info">
              <label htmlFor="number">Rating</label>
              <span className="slider-rating">{rating}/10</span>
            </div>
            <input
              onChange={changeRating}
              type="range"
              max="10"
              min="0"
              step="0.1"
            />
          </div>
          <div className="container">
            <label htmlFor="notes">Notes</label>
            <textarea
              className="notes"
              name="notes"
              onChange={handleNoteChange}
              placeholder="Enter Review"
            ></textarea>
          </div>
          <button className="submit" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
