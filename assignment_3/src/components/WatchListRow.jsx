import { Link } from "react-router-dom";
import { useState } from "react";

function WatchListRow({ movie, updatePriority, DeleteMovie }) {
  const [priority, setPriority] = useState(movie.priority);

  function changePriority(ev) {
    setPriority(ev.target.value);
    updatePriority(movie.movieID, priority);
  }

  function HandleDelete(movieID) {
    DeleteMovie(movieID);
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
        <button
          type="submit"
          name="delete"
          onSubmit={HandleDelete(movie.movieID)}
        ></button>
      </td>
    </tr>
  );
}

export default WatchListRow;
