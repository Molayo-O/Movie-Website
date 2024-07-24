import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { AuthContext } from "./Authentication";

export function QuickAddButton({ movie }) {
  const { apiKey } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);

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

  const handleQuickAdd = async () => {
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

  return (
    <button id="QuickAdd" onClick={handleQuickAdd}>
      <FontAwesomeIcon className="addIcon" icon={faPlus} />
    </button>
  );
}
