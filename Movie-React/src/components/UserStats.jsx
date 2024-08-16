import { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./Authentication";

import "../styles/UserStats.css";
function UserStats() {
  const { apiKey } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  // const highestRatedMovies = stats.Highest_rated_movies;
  // const recentlyCompletedMovies = stats.Recently_Completed_Movies;
  // const mostWatchedMovies = stats.Most_Watched_Movies;

  useEffect(() => {
    async function fetchData() {
      let baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/user/stats`;

      try {
        const resp = await fetch(baseUrl, { headers: { "X-API-Key": apiKey } });
        const jsonResponse = await resp.json();
        setStats(jsonResponse);
      } catch (error) {
        console.log("Error in fetching user data:", error);
      }
    }
    fetchData();
  }, []);

  console.log(stats);

  if (stats == null) {
    return (
      <>
        <div>
          <h1>Loading</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <section className="UserStats">
        <div className="profile">
          <h1>**ProfileName**</h1>
          <h1>**profileIMG**</h1>
        </div>

        <h2 id="statsHeader">Your Statistics</h2>
        <div className="StatsGrid">
          <div className="Stat">
            <h3>Total Time Watched : {stats.Total_time_watched}</h3>
            <h3>Total Movies Watched : {stats.Total_movies_watched}</h3>
          </div>
          <div className="Stat">
            <h3>Your 5 Highest Rated Movies</h3>
            <ul>
              {stats.Highest_Rated_Movies.map((movie) => (
                <li key={movie.Title}>
                  <h3>
                    {movie.Title} - {movie.Rating}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
          <div className="Stat">
            <h3>Recently Completed</h3>
            <ul>
              {stats.Recently_Completed_Movies.map((movie) => (
                <li key={movie.Title}>
                  <h3>
                    {movie.Title} - {movie.Last_Watched}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
          <div className="Stat">
            <h3>Your Most Watched Movies</h3>
            <ul>
              {stats.Most_Watched_Movies.map((movie) => (
                <li key={movie.Title}>
                  <h3>
                    {movie.Title} - {movie.Times_watched} times
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserStats;
