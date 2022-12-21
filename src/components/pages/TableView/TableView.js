import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { choosenTable } from '../../../redux/tablesReducer';
import { Container, Button, Row, Col } from 'react-bootstrap';
import clsx from 'clsx';

const TableView = () => {

  const { tableId } = useParams();
  const table = useSelector(state => choosenTable(state.tables, tableId));
  const statusValue = table.status;
  // TODO 

  // wartość atrybutu value w select i inputach zależy od właściwości wybranego stolika ale nie może być zmieniana
  // jak można edytować te dane w inputach/select
  // tak aby nowe wartości przekazać na serwer
  
  // przycisk Update
  // jego zadanie to przekazywanie nowych danych wprowadzonych przez użytkownika, zmieniają one dane na serwerze
  
  return(
    <Container className={clsx('m-1', 'p-0', 'h-100')}>
      <h1 className={clsx('fs-2', 'my-3')}>Table {table.id}</h1>
      <form>
        <Row className={clsx('mb-3')}>
          <Col className={clsx('col-1')}>
            <label for="status" className={clsx('form-label', 'fw-bold')}>Status:</label>
          </Col>
          <Col className={clsx('col-2')}>
            <select id="status" value={statusValue} className={clsx('form-select')} aria-describedby="selectTableStatus">
              <option key="busy" value="busy">Busy</option>
              <option key="free" value="free">Free</option>
              <option key="reserved" value="reserved">Reserved</option>
              <option key="cleaning" value="cleaning">Cleaning</option>
            </select>
          </Col>
        </Row>
        <Row className={clsx('mb-3')}>
          <Col className={clsx('col-1')}>
            <label for="guests" className={clsx('form-label', 'fw-bold')}>Guests:</label>
          </Col>
          <Col className={clsx('col-2', 'd-flex')}>
            <input type="text" value={table.peopleAmount} id="guests" className={clsx('form-control')} aria-describedby="amountOfGuests"></input>
            <span className={clsx('mx-2')}> / </span>
            <input type="text" value={table.maxPeopleAmount} className={clsx('form-control')} aria-describedby="maxAmountOfGuests"></input>
          </Col>
        </Row>
        <Row className={clsx('mb-3')}>
          <Col className={clsx('col-1')}>
            <label for="bill" className={clsx('form-label', 'fw-bold')}>Bill:</label>
          </Col>
          <Col className={clsx('col-2', 'd-flex')}>
            <span className={clsx('me-2')}>$</span>
            <input type="text" value={table.bill} className={clsx('form-control')} aria-describedby="bill"></input>
          </Col>
        </Row>
        <Button>Update</Button>
      </form>
    </Container>
  )
};

export default TableView;