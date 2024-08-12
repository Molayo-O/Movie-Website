import FilterGenre from "./FilterGenre";
import FilterRating from "./FilterRating";
import FilterYear from "./filterYear";
import FilterDate from "./FilterDate";
import FilterTimesWatched from "./FilterTimeWatched";
import FilterByPriority from "./FilterByPriority";

export default function Filters({
  getGenreMovies,
  getMoviesByRating,
  getMoviesByYear,
  getMoviesByDate,
  getMoviesByTimesWatched,
  getMoviesByPriority,
}) {
  return (
    <ul className="Filters">
      <li className="titleFilter">Filter By</li>
      <li className="filterOptions">
        <FilterGenre searchGenre={getGenreMovies} />
      </li>
      <li className="filterOptions">
        <FilterRating setOrder={getMoviesByRating} />
      </li>
      <li className="filterOptions">
        <FilterYear setYear={getMoviesByYear} />
      </li>
      {getMoviesByDate && (
        <li
          className="filterOptions"
          style={{ width: "35%" }}
        >
          <FilterDate setDate={getMoviesByDate} />
        </li>
      )}
      {getMoviesByTimesWatched && (
        <li
          className="filterOptions"
          style={{ width: "35%" }}
        >
          <FilterTimesWatched setTimesWatched={getMoviesByTimesWatched} />
        </li>
      )}
      {getMoviesByPriority && (
        <li
          className="filterOptions"
          style={{ width: "30%" }}
        >
          <FilterByPriority setPriority={getMoviesByPriority} />
        </li>
      )}
    </ul>
  );
}
