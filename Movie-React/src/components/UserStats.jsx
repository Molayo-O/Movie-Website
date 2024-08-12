import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "./Authentication";
import { useNavigate } from "react-router-dom";
import "../styles/UserStats.css";
function UserStats() {
  const { apiKey } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);

  // SQL query for user stats
  /*

profile photo
user name
total time watched (hours,mins,seconds)
recently watched
top 5 movies (rating)
top 5 most watched (times)

  */
  return (
    <>
      <section className="UserStats">
        <h1>User Stats</h1>
      </section>
    </>
  );
}

export default UserStats;
