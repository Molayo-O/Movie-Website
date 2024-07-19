import { useState, useEffect } from "react";
import {SearchForm} from "./searchForm";
import {MovieGrid} from "./MovieGrid";

export default function SearchMovie() {
    const [Movies, SetMovies] = useState([]);
    const [searchFor, SetSearchFor] = useState("");
    
    //function to retrieve specific movie
    async function myEffect() {
      const baseUrl = `https://loki.trentu.ca/~molayoogunfowora/3430/assn/cois-3430-2024su-a2-Molayo-0/api/movies/?title=${searchFor}`
      const resp = await fetch(baseUrl);
      const jsonResponse = await resp.json();
      SetMovies(jsonResponse);
    }
  
    useEffect(() => {
      myEffect(searchFor);
    }, [searchFor]);
  
    function getMovie(name) {
      SetSearchFor(name);
    }
    return (
      <>
        <SearchForm search={getMovie} />
        <MovieGrid Movies={Movies}/>
      </>
    );
  }