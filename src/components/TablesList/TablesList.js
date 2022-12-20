import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const TablesList = () => {

  const tables = useSelector(state => state.tables);
  console.log('tables list', tables);

  return(
    <section>
      <h2>Tables</h2>
      <ul>
        {tables.map( table => <li key={table.id}>Table {table.id}<Link to={`/table/${table.id}`}>Show more</Link></li>)}
      </ul>
    </section>
  )
}

export default TablesList;