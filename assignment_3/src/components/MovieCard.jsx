import "../styles/MovieCard.css";

function MovieCard({ movie }) {
  return (
    <>
      <div className="MovieCard">
        <h1>Card</h1>
        <h3>{movie.title}</h3>
        <img src={movie.poster} />
        <p>{movie.vote_average}</p>
      </div>
    </>
  );
}

export default MovieCard;
