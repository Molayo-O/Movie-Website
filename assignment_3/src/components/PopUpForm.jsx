import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "./Authentication";

function PopUpForm({ movie }) {
  //state variables
  const [isVisible, setIsVisible] = useState(false);

  function handleSumbit() {
    // need to put form submission here
  }

  const { apiKey } = useContext(AuthContext);

  async function fetchMovies(apikey) {
    let baseUrl =
      "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries";
    const resp = await fetch(baseUrl, {
      headers: { "X-API-Key": apikey },
    });
    const jsonResponse = await resp.json();
    const movies = jsonResponse;
    let movieList = [movies];
    console.log(movies);
    return movieList;
  }

  const handleFullAdd = async () => {
    let movieList = await fetchMovies(apiKey);
    movieList = movieList[0];

    if (movieList.some((currMovie) => currMovie.Movie_Title == movie.Title)) {
      throw new Error("Movie already exists in watch list!");
    } else {
      try {
        console.log(movie.movieID, apiKey);
        let url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries/${movie.movieID}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json",
          },
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
    }
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

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
                handleSumbit();
              }}
            >
              <div className="container">
                <input type="text" />
                <label htmlFor="name" name="name">
                  Name
                </label>
              </div>
              <div className="container">
                <input className="notes" type="text" name="notes" />
                <label htmlFor="notes">Notes</label>
              </div>
              <div className="container">
                <input type="number" />
                <label htmlFor="number">Priority</label>
              </div>
              <div className="container">
                <input type="email" />
                <label htmlFor="email">Email</label>
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
