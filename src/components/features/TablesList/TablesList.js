import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import clsx from 'clsx';


const TablesList = () => {

  const tables = useSelector(state => state.tables);

  return(
    <Container className={clsx('m-1', 'p-0')}>
      <h1 className={clsx('fs-2', 'my-3')}>All Tables</h1>
      <Container className={clsx('my-3', 'mx-0', 'p-0')}>
        {tables.map(
          table => 
            <Row key={table.id} className={clsx('align-items-baseline', 'mx-auto', 'border-bottom', 'my-2', 'p-0')}>
              <Col className={clsx('col-lg-2', 'fs-5', 'p-0')}>Table {table.id}</Col>
              <Col className={clsx('fs-5')}><p>Status:<span className={clsx('fw-light')}>{table.status}</span></p></Col>
              <Col className={clsx('col-lg-2', 'text-end', 'p-0')}>
                <Button>
                  <Link to={`/table/${table.id}`} className={clsx('text-light', 'text-decoration-none')}>Show more</Link>
                </Button>
              </Col>
            </Row>
        )}
      </Container>
    </Container>
  );
};

export default TablesList;