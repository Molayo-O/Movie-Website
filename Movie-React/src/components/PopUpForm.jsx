import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Authentication";

function PopUpForm({ movie, onSuccess, onFailure, onClose }) {
  //state variables
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState(1);
  const { apiKey } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFullAdd = async () => {
    const formData = new URLSearchParams();
    formData.append("notes", notes);
    formData.append("priority", priority);

    console.log(formData);
    try {
      let url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries/${movie.movieID}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "X-API-Key": apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding movie:", error);
      onFailure;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFullAdd();
  };

  return (
    <div className="popup-form active">
      <div className="popup-form-content">
        <button className="close" onClick={onClose}>
          x
        </button>
        <div className="title-container">
          <p className="WatchListFont">Movie: </p>
          <h2>{movie.Title}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <label htmlFor="priority">Priority</label>
            <span className="slider-rating">{priority}</span>
            <input
              type="range"
              max="10"
              min="0"
              step="1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
          </div>
          <button className="submit" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopUpForm;
