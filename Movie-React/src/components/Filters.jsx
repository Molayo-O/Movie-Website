import FilterGenre from "./FilterGenre";
import FilterRating from "./FilterRating";
import FilterYear from "./filterYear";

export default function Filters({
  getGenreMovies,
  getMoviesByRating,
  getMoviesByYear,
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
    </ul>
  );
}
