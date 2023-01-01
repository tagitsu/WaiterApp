import { useSelector } from "react-redux";
import { Container } from 'react-bootstrap';
import clsx from 'clsx';
import AddTableForm from '../AddTableForm/AddTableForm';
import TableItem from '../TableItem/TableItem';
import { getAllTables } from "../../../redux/tablesRedux";
import LoadingPage from "../../views/LoadingPage/LoadingPage";


const TablesList = (props) => {

  const tables = useSelector(state => getAllTables(state));
  const isLoading = props.loading;

  if(isLoading) {
    return(
      <LoadingPage />
    );
  } else {
  return(
    <Container className={clsx('m-1', 'p-0')}>
      <h1 className={clsx('fs-2', 'my-3')}>All Tables</h1>
      <TableItem tables={tables} />
      <AddTableForm tables={tables} />
    </Container>
  );
  }
};

export default TablesList;