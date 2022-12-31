import { useSelector } from "react-redux";
import { Container } from 'react-bootstrap';
import clsx from 'clsx';
import AddTableForm from '../AddTableForm/AddTableForm';
import TableItem from '../TableItem/TableItem';
import LoadingPage from "../../views/LoadingPage/LoadingPage";
import { getAllTables } from "../../../redux/tablesRedux";


const TablesList = () => {

  const tables = useSelector(state => getAllTables(state));
  console.log('tables list - ściągam wszystkie stoliki', tables);

  return(
    <Container className={clsx('m-1', 'p-0')}>
      <h1 className={clsx('fs-2', 'my-3')}>All Tables</h1>
      <TableItem tables={tables} />
      <AddTableForm tables={tables} />
    </Container>
  );
};

export default TablesList;