import "../styles/genres.css";
// import { useState } from "react";
function FilterGenre({ searchGenre }) {
  //
  //
  // const [genreMovieList, setGenreMovieList] = useState([]);
  // const [GenreSelection, setGenreSelection] = useState("");

  //define function to fetch all movies
  async function submitGenre(ev) {
    const selectedGenre = ev.target.value;
    searchGenre(selectedGenre);
  }

  return (
    <>
      <ul className="Filters">
        <li className="titleFilter">Filter By</li>
        <li className="filterOptions">
          <label htmlFor="genres"></label>
          <select name="genres" id="genres" onChange={submitGenre}>
            <option value="x">Genre</option>
            <option value="action">Action</option>
            <option value="thriller">Thriller</option>
            <option value="horror">Horror</option>
            <option value="comedy">Comedy</option>
          </select>
        </li>
      </ul>
    </>
  );
}

export default FilterGenre;
