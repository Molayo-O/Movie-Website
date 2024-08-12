export default function FilterByPriority({ setPriority }) {
  //define function to set ratingOrder
  async function submitOrder(ev) {
    const selectedOrder = ev.target.value;
    setPriority(selectedOrder);
  }

  return (
    <>
      <label htmlFor="orderPriority"></label>
      <select name="orderPriority" id="orderPriority" onChange={submitOrder}>
        <option value="x">Priority</option>
        <option value="DESC">Lowest</option>
        <option value="ASC">Highest</option>
      </select>
    </>
  );
}
