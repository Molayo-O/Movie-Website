import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddCompletedWatchForm from "./AddCompletedWatchForm";

function WatchListRow({ movie, updatePriority, DeleteMovie }) {
  const [priority, setPriority] = useState(movie.priority);

  function changePriority(ev) {
    setPriority(ev.target.value);

    updatePriority(movie.movieID, priority);
  }

  function HandleDelete() {
    DeleteMovie(movie.movieID);
  }

  return (
    <tr key={movie.movieID}>
      <td>
        <div className="movie-container">
          <img src={movie.Poster} alt="movie poster" />
          <Link to={`/movie/${movie.movieID}`}>
            <h4>{movie.Title}</h4>
          </Link>
        </div>
      </td>

      <td>
        <input type="number" value={priority} onChange={changePriority} />
      </td>
      <td>
        <button className="delete-button" name="delete" onClick={HandleDelete}>
          Delete
        </button>
      </td>
      <td>
        <AddCompletedWatchForm
          movie={movie}
          DeleteFromToWatch={{ HandleDelete }}
        />
      </td>
    </tr>
  );
}

export default WatchListRow;
