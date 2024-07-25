import { Link } from "react-router-dom";

function WatchListCard({ movie }) {
  console.log(movie);
  return (
    <>
      <div className="MovieCard">
        <Link id="Poster" to={`/movie/${movie.movieID}`}>
          <img src={movie.Poster} />
          {/* <div className="text">
            <h3 className="lora movieTitle">{movie.Title}</h3>
          </div> */}
        </Link>
      </div>
    </>
  );
}

export default WatchListCard;
