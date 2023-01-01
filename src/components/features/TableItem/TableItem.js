import { Link } from 'react-router-dom';
import { removeTableRequest } from "../../../redux/tablesRedux";
import { useDispatch } from "react-redux";
import { Button, Row, Col } from 'react-bootstrap';
import clsx from 'clsx';

const TableItem = (props) => {
  const dispatch = useDispatch();

  const tables = props.tables;

  const handleRemove = (e, removingTableId) => {
    e.preventDefault();
    dispatch(removeTableRequest(removingTableId));
  };

  return(
    <>
    {tables.map(
      table =>
        <Row key={table.id} className={clsx('align-items-center', 'mx-auto', 'border-bottom', 'my-2', 'p-2')}>
          <Col className={clsx('col-lg-2', 'p-2')}>
            <h3>Table {table.id}</h3></Col>
          <Col className={clsx()}>
            <h3 className={clsx('fw-light')}>Status:
            <small className={clsx('fw-light', 'text-muted')}> {table.status}</small></h3></Col>
          <Col className={clsx('col-lg-2', 'text-end', 'p-0', 'd-flex', 'justify-content-between')}>
            <Button>
              <Link to={`/table/${table.id}`} className={clsx('text-light', 'text-decoration-none')}>Show more</Link>
            </Button>
            <Button className={clsx('btn-danger')} onClick={(e) => handleRemove(e, table.id)}>X</Button>
          </Col>
        </Row>
    )}
    </>
  );
};

export default TableItem;