import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { AuthContext } from "./Authentication";

export function QuickAddButton({ movie }) {
  const { apiKey } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);

  const handleQuickAdd = async () => {
    try {
      console.log(movie.movieID, apiKey);
      let url =
        "https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/towatchlist/entries";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        // *************
        // This will need to be movie ID only
        //**************
        body: JSON.stringify({
          movieID: movie.movieID,
        }),
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

  return (
    <button id="QuickAdd" onClick={handleQuickAdd}>
      <FontAwesomeIcon className="addIcon" icon={faPlus} />
    </button>
  );
}
