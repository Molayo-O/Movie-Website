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
      <div className="genreContainer">
        <label htmlFor="genres"></label>
        <select name="genres" id="genres" onChange={submitGenre}>
          <option value="x">Filter By Genre</option>
          <option value="action">Action</option>
          <option value="thriller">Thriller</option>
          <option value="horror">Horror</option>
          <option value="comedy">Comedy</option>
        </select>
      </div>
    </>
  );
}

export default FilterGenre;
