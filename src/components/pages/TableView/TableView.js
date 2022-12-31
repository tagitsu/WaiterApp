import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { choosenTable } from '../../../redux/tablesRedux';
import { Container } from 'react-bootstrap';
import clsx from 'clsx';
import UpdateTableForm from '../../features/UpdateTableForm/UpdateTableForm';
import { useState } from 'react';

const TableView = () => {

  const stan = useSelector(state => state);
  console.log('state TableView', stan);
  const { tableId } = useParams();
  console.log('table view ID - UseParams zwraca obiekt z id stolika', tableId);
  
  const table = useSelector(state => choosenTable(state.tables, tableId));
  
  if(!table) console.log('choosenTable nie zadziałał');

  return(
    <Container className={clsx('m-1', 'p-0', 'h-100')}>
      <h1 className={clsx('fs-2', 'my-3')}>Table {table.id}</h1>
      <UpdateTableForm table={table} />
    </Container>
  );
};

export default TableView;