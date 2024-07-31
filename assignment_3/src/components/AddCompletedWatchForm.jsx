import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "./Authentication";
import { useNavigate } from "react-router-dom";

function AddCompletedWatchForm({ movie, DeleteFromToWatch }) {
  //state variables
  const [isVisible, setIsVisible] = useState(false);
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const { apiKey } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [lastDateWatched, setLastDateWatched] = useState();

  const handleFullAdd = async (notes, rating) => {
    const formData = new URLSearchParams();
    formData.append("notes", notes);
    formData.append("rating", rating);

    console.log("formData:", formData.toString());
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
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Movie added successfully:", data);
      DeleteFromToWatch(movie.movieID);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleButtonClick = () => {
    if (!isAuth) {
      navigate("/Login");
      return;
    }
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };
  function handleNoteChange(ev) {
    setNotes(ev.target.value);
  }

  function changeRating(ev) {
    setRating(ev.target.value);
  }
  return (
    <div>
      <button onClick={handleButtonClick}>
        <h3> Watched It!</h3>
      </button>

      {isVisible && (
        <div className="popup-form">
          <div className="popup-form-content">
            <button className="close" onClick={handleClose}>
              x
            </button>
            <h2 className="WatchListFont">Watched It!</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setIsVisible();
                handleFullAdd(notes, rating);
              }}
            >
              <div className="container">
                <input onChange={changeRating} type="number" />
                <label htmlFor="number">Rating / 10</label>
              </div>
              <div className="container">
                <textarea
                  className="notes"
                  name="notes"
                  onChange={handleNoteChange}
                ></textarea>
                <label htmlFor="notes">Notes</label>
              </div>
              <button className="submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCompletedWatchForm;
// Sort by priority desc

// update priority button
// watched it! button -> add to completedwatch
// remove movie button
//
