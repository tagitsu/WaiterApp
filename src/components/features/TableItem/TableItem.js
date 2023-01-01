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
        <Row key={table.id} className={clsx('align-items-baseline', 'mx-auto', 'border-bottom', 'my-2', 'p-0')}>
          <Col className={clsx('col-lg-2', 'fs-5', 'p-0')}>Table {table.id}</Col>
          <Col className={clsx('fs-5')}><p>Status: <span className={clsx('fw-light')}>{table.status}</span></p></Col>
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