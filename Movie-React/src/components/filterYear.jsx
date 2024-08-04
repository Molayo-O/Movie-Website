import { useState, useEffect } from "react";
import "../styles/genres.css";

export default function FilterYear({ setYear }) {
    //define function to set year
    async function submitYear(ev) {
      const selectedYear = ev.target.value;
      setYear(selectedYear);
    }

  return (
    <>
      <label htmlFor="filterYear"></label>
      <select name="filterYear" id="filterYear" onChange={submitYear}>
        <option value="x">Year</option>
        <option value="2010">2010s</option>
        <option value="2000">2000s</option>
        <option value="1990">1990s</option>
        <option value="1980">1980s</option>
        <option value="1970">1970s</option>
        <option value="1960">1960s</option>
        <option value="1950">1950s</option>
      </select>
    </>
  );
}