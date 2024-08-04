import { useState, useEffect } from "react";
import "../styles/genres.css";

export default function FilterRating({ setOrder }) {
    //define function to set ratingOrder
    async function submitOrder(ev) {
      const selectedOrder = ev.target.value;
      setOrder(selectedOrder);
    }

  return (
    <>
      <label htmlFor="orderRating"></label>
      <select name="orderRating" id="orderRating" onChange={submitOrder}>
        <option value="x">Rating</option>
        <option value="DESC">Highest Rated</option>
        <option value="ASC">Lowest Rated</option>
      </select>
    </>
  );
}
