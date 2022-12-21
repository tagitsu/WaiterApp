import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import styles from './TablesList.module.scss';
import clsx from 'clsx';


const TablesList = () => {

  const tables = useSelector(state => state.tables);
  console.log('tables list', tables);

  return(
    <section>
      <h2>All Tables</h2>
      <Container className="container-fluid">
        {tables.map(
          table => 
            <Row key={table.id} className={clsx(styles.table, 'aligh-items-end', 'border-bottom')}>
              <Col className={clsx(styles.table__name,'col-lg-2')}>Table {table.id}</Col>
              <Col className={clsx(styles.table__status)}><p>Status:<span className={styles.table__status_name}> {table.status}</span></p></Col>
              <Col className={clsx(styles.table__button, 'col-lg-2')}>
                <Button>
                  <Link to={`/table/${table.id}`}>Show more</Link>
                </Button>
              </Col>
            </Row>
        )}
      </Container>
    </section>
  )
}

export default TablesList;