import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import clsx from 'clsx';
import { removeTableRequest } from "../../../redux/tablesReducer";


const TablesList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tables = useSelector(state => state.tables);

  const handleRemove = (e, removingTable) => {
    e.preventDefault();
    console.log('handleRemove', e.target.id);
    dispatch(removeTableRequest(removingTable));
    navigate('/');
  };

  return(
    <Container className={clsx('m-1', 'p-0')}>
      <h1 className={clsx('fs-2', 'my-3')}>All Tables</h1>
      <Container className={clsx('my-3', 'mx-0', 'p-0')}>
        {tables.map(
          table => 
            <Row key={table.id} className={clsx('align-items-baseline', 'mx-auto', 'border-bottom', 'my-2', 'p-0')}>
              <Col className={clsx('col-lg-2', 'fs-5', 'p-0')}>Table {table.id}</Col>
              <Col className={clsx('fs-5')}><p>Status: <span className={clsx('fw-light')}>{table.status}</span></p></Col>
              <Col className={clsx('col-lg-2', 'text-end', 'p-0', 'd-flex', 'justify-content-between')}>
                <Button>
                  <Link to={`/table/${table.id}`} className={clsx('text-light', 'text-decoration-none')}>Show more</Link>
                </Button>
                <Button className={clsx('btn-danger')} onClick={(e) => handleRemove(e, table)}>X</Button>
              </Col>
            </Row>
        )}
        <Button className={clsx('btn-success')} onClick={(e) => console.log('dodaje stolik', e.target)}>Add table</Button>

      </Container>
    </Container>
  );
};

export default TablesList;