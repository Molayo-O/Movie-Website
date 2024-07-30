import WatchListCard from "./WatchListCard";

export function WatchListGrid({ movies }) {
  return (
    <>
      <div className="MovieGrid">
        {movies.map((movie) => (
          <WatchListCard movie={movie} key={movie.movieID} />
        ))}
      </div>
    </>
  );
}
