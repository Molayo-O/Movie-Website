export default function FilterDate({ setDate }) {
  //define function to set dateOrder
  async function submitOrder(ev) {
    const selectedDateOrder = ev.target.value;
    setDate(selectedDateOrder);
  }

  return (
    <>
      <label htmlFor="orderDate"></label>
      <select name="orderDate" id="orderDate" onChange={submitOrder}>
        <option value="x">Date Seen</option>
        <option value="DESC">Latest First</option>
        <option value="ASC">Earliest First</option>
      </select>
    </>
  );
}
