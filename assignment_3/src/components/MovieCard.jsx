import "../styles/MovieCard.css";

function MovieCard({ movie }) {
  return (
    <>
      <div className="MovieCard">
        <h1>Card</h1>
        {/* <h3>{movie.title}</h3> */}
        {/* <img src="{movie.picture}" alt="" /> */}
        {/* <p>{movie.rating}</p> */}
      </div>
    </>
  );
}

export default MovieCard;
