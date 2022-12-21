import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { choosenTable } from '../../../redux/tablesReducer';
import { Container, Button, Row, Col } from 'react-bootstrap';
import clsx from 'clsx';

const TableView = () => {

  const tableId = useParams();
  const tables = useSelector(state => state.tables);
  const choosenTable = (id) => {
    tables.filter( table => id === table.id);
  }
  console.log('table view selector', tables);
  console.log('table view', tableId);
  console.log('choosen', choosenTable(tableId));

  // TODO 
  // w zależności od wybranego stolika (na podstronie Home), dostaję info o id wybranego stolika
  // chcę znaleźć na serwerze odpowiedni obiekt z tablicy tables (o odpowiadającym id), 
  // aby móc w komponencie wyświetlić: id stolika, wybrać opcję zgodną z jego statusem, otrzymać w inputach odpowiednie wartości ilości gości, wysokości rachunku

  // jak w zależności od statusu wyswietlić odpowiednią opcję w elemencie select - atrybut selected ?
  // jak wstawić do inputów wartości z odpowiadających właściwości obiektu table - atrybut value ?

  // przycisk Update
  // jego zadanie to przekazywanie nowych danych wprowadzonych przez użytkownika, zmieniają one dane na serwerze
  
  return(
    <Container className={clsx('m-1', 'p-0', 'h-100')}>
      <h1 className={clsx('fs-2', 'my-3')}>Table</h1>
      <form>
        <Row className={clsx('mb-3')}>
          <Col className={clsx('col-1')}>
            <label for="status" className={clsx('form-label', 'fw-bold')}>Status:</label>
          </Col>
          <Col className={clsx('col-2')}>
            <select id="status" className={clsx('form-select')} aria-describedby="selectTableStatus">
              <option value="busy">Busy</option>
              <option value="free">Free</option>
              <option value="reserved">Reserved</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </Col>
        </Row>
        <Row className={clsx('mb-3')}>
          <Col className={clsx('col-1')}>
            <label for="guests" className={clsx('form-label', 'fw-bold')}>Guests:</label>
          </Col>
          <Col className={clsx('col-2', 'd-flex')}>
            <input type="text" id="guests" className={clsx('form-control')} aria-describedby="amountOfGuests"></input>
            <span className={clsx('mx-2')}> / </span>
            <input type="text" className={clsx('form-control')} aria-describedby="maxAmountOfGuests"></input>
          </Col>
        </Row>
        <Row className={clsx('mb-3')}>
          <Col className={clsx('col-1')}>
            <label for="bill" className={clsx('form-label', 'fw-bold')}>Bill:</label>
          </Col>
          <Col className={clsx('col-2', 'd-flex')}>
            <span className={clsx('me-2')}>$</span>
            <input type="text" className={clsx('form-control')} aria-describedby="bill"></input>
          </Col>
        </Row>
        <Button>Update</Button>
      </form>
    </Container>
  )
};

export default TableView;