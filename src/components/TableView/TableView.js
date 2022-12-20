
const TableView = () => {
  return(
    <section>
      <form>
        Status
        <select>
          <option>Busy</option>
          <option>Free</option>
          <option>Reserved</option>
          <option>Cleaning</option>
        </select>
        People
        <input type="text"></input>
        /
        <input type="text"></input>
        Bill 
        $ <input type="text"></input>
        <button>Update</button>
      </form>
    </section>
  )
};

export default TableView;