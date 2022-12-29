import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { choosenTable } from '../../../redux/tablesReducer';
import { Container } from 'react-bootstrap';
import clsx from 'clsx';
import UpdateTableForm from '../../features/UpdateTableForm/UpdateTableForm';

const TableView = () => {

  const { tableId } = useParams();
  console.log('table view ID', tableId);
  const table = useSelector(state => choosenTable(state.tables, tableId));
  
  return(
    <Container className={clsx('m-1', 'p-0', 'h-100')}>
      <h1 className={clsx('fs-2', 'my-3')}>Table {table.id}</h1>
      <UpdateTableForm table={table} />
    </Container>
  );
};

export default TableView;