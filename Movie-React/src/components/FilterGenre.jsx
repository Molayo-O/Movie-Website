import "../styles/genres.css";
// import { useState } from "react";
function FilterGenre({ searchGenre }) {
  async function submitGenre(ev) {
    const selectedGenre = ev.target.value;
    searchGenre(selectedGenre);
  }

  return (
    <>
      <label htmlFor="genres"></label>
      <select name="genres" id="genres" onChange={submitGenre}>
        <option value="x">Genre</option>
        <option value="action">Action</option>
        <option value="thriller">Thriller</option>
        <option value="horror">Horror</option>
        <option value="comedy">Comedy</option>
      </select>
    </>
  );
}

export default FilterGenre;
