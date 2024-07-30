import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "./Authentication";

function PopUpForm({ movie }) {
  //state variables
  const [isVisible, setIsVisible] = useState(false);
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState(1);
  const { apiKey } = useContext(AuthContext);

  const handleFullAdd = async (notes, priority) => {
    const formData = new URLSearchParams();
    formData.append("notes", notes);
    formData.append("priority", priority);
    console.log("formData:", formData.toString());
    try {
      let url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries/${movie.movieID}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Movie added successfully:", data);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };
  function handleNoteChange(ev) {
    setNotes(ev.target.value);
  }

  function changePriority(ev) {
    setPriority(ev.target.value);
  }
  return (
    <div>
      <button onClick={handleButtonClick}>
        <FontAwesomeIcon className="addIcon" icon={faPlus} /> Add to WatchList
      </button>

      {isVisible && (
        <div className="popup-form">
          <div className="popup-form-content">
            <button className="close" onClick={handleClose}>
              x
            </button>
            <h2 className="WatchListFont">Add To WatchList</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setIsVisible();
                handleFullAdd(notes, priority);
              }}
            >
              <div className="container">
                <input onChange={changePriority} type="number" />
                <label htmlFor="number">Priority</label>
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

export default PopUpForm;
// Sort by priority desc

// update priority button
// watched it! button -> add to completedwatch
// remove movie button
//
