import WatchListRow from "./WatchListRow";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Authentication";

export function WatchListTable({ movies }) {
  const { apiKey } = useContext(AuthContext);


  async function DeleteMovie(movieID) {
    const url = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries/${movieId}/priority`;
    const formData = new URLSearchParams();
    const resp = await fetch(url, {
      method: "",
      headers: {
        "X-API-Key": apiKey,
      },
      body: formData,
      // body: JSON.stringify({ [endpoint]: newValue }),
    });
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
      // body: JSON.stringify({ [endpoint]: newValue }),
    });
  }
  return (
    <>
      <h1 className="Heading">Completed WatchList</h1>

      <table className="CompletedWatch">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <WatchListRow
              key={movie.movieID}
              movie={movie}
              updatePriority={updatePriority}
              DeleteMovie={DeleteMovie}
              // updateMovieDetail={updateMovieDetail}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
