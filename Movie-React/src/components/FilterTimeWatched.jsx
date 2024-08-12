export default function FilterTimesWatched({ setTimesWatched }) {
  //define function to set ratingOrder
  async function submitOrder(ev) {
    const selectedOrder = ev.target.value;
    setTimesWatched(selectedOrder);
  }

  return (
    <>
      <label htmlFor="orderTimesWatched"></label>
      <select
        name="orderTimesWatched"
        id="orderTimesWatched"
        onChange={submitOrder}
      >
        <option value="x">Rewatches </option>
        <option value="DESC">Highest</option>
        <option value="ASC">Lowest</option>
      </select>
    </>
  );
}
