import { Link } from "react-router-dom";
import { useState } from "react";

function WatchListRow({ movie, updatePriority }) {
  const [priority, setPriority] = useState(movie.priority);

  function changePriority(ev) {
    setPriority(ev.target.value);

    updatePriority(movie.movieID, priority);
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

      <input type="number" value={priority} onChange={changePriority} />
      <label htmlFor="number">Priority</label>
    </tr>
  );
}

export default WatchListRow;
