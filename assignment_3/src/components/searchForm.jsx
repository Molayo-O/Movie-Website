import { useState } from "react";
import "../styles/searchForm.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchForm({search}) {
  const [searchTerm, setSearchTerm] = useState('');
  //define function to capture input

  const captureInput = (ev) => {
    setSearchTerm(ev.target.value);
  };

  //Function to handleSubmit
  function handleSubmit(event) {
    event.preventDefault();
    search(searchTerm);
    //reset input
    setSearchTerm('');
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input type="text"
      value={searchTerm}
      onChange={captureInput}
      />
      <button>Find Contacts!</button>
    </form>
  );
}
