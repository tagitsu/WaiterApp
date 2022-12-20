import { useSelector } from "react-redux";


const TablesList = () => {

  const tables = useSelector( state => state.tables);

  return(
    <ul>
      {tables.map( table => <li key={table.id}>Table {table.id}</li>)}
    </ul>
  )  
}

export default TablesList;