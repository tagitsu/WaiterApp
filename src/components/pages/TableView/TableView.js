import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { choosenTable, getInputsValues } from '../../../redux/tablesReducer';
import { Container, Button, Row, Col } from 'react-bootstrap';
import clsx from 'clsx';
import { useState } from 'react';

const TableView = () => {
  const dispatch = useDispatch();

  const { tableId } = useParams();
  const table = useSelector(state => choosenTable(state.tables, tableId));
  

  // const dispatch = useDispatch();
  // useEffect( () => dispatch(fetchTables()), [dispatch]);

  // dzialanie formularza przy zmianie statusu stolika
  
  const [ status, setStatus ] = useState(table.status);
  const [ guests, setGuests ] = useState(table.peopleAmount);
  const [ bill, setBill ] = useState(table.bill);
  console.log('stan wyjściowy', status, guests, bill);

  // const updateInputsValues = (newStatus) => {
  //   if(newStatus === 'busy') {
  //   console.log('zajęty')
  //   setGuests(table.peopleAmount);
  //   setBill(table.bill);
  //   }
  //   if(newStatus === 'free' || newStatus === 'cleaning') {
  //     console.log('wolny/czyszczenie');
  //     setGuests(0);
  //     setBill(0);
  //   }
  //   if(newStatus === 'reserved') {
  //     console.log('zarezerwowany');
  //     setGuests(table.peopleAmount);
  //     setBill(20);
  //   }
  // }

  const handleChangeStatus = e => {
    e.preventDefault();
    console.log('target.value', e.target.value);
    setStatus(e.target.value);
    dispatch(getInputsValues(e.target.value, dispatch));
    
  }

  console.log('po zmianie', status, guests, bill);

  console.log('table z serwera', table);
  
  

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
          <Col className={clsx('col-2')}>
            <label htmlFor="status" className={clsx('form-label', 'fw-bold')}>Status:</label>
          </Col>
          <Col className={clsx('col-4')}>
            <select id="status" defaultValue={status} className={clsx('form-select')} aria-describedby="selectTableStatus" onChange={handleChangeStatus}>
              <option key="busy" value="busy">Busy</option>
              <option key="free" value="free">Free</option>
              <option key="reserved" value="reserved">Reserved</option>
              <option key="cleaning" value="cleaning">Cleaning</option>
            </select>
          </Col>
        </Row>
        <Row className={clsx('mb-3')}>
          <Col className={clsx('col-2')}>
            <label htmlFor="guests" className={clsx('form-label', 'fw-bold')}>Guests:</label>
          </Col>
          <Col className={clsx('col-4', 'd-flex')}>
            <input type="text" defaultValue={guests} id="guests" className={clsx('form-control')} aria-describedby="amountOfGuests"></input>
            <span className={clsx('mx-2')}> / </span>
            <input type="text" defaultValue={table.maxPeopleAmount} id="maxGuests" className={clsx('form-control')} aria-describedby="maxAmountOfGuests"></input>
          </Col>
        </Row>
        <Row className={clsx('mb-3')}>
          <Col className={clsx('col-2')}>
            <label htmlFor="bill" className={clsx('form-label', 'fw-bold')}>Bill:</label>
          </Col>
          <Col className={clsx('col-4', 'd-flex')}>
            <span className={clsx('me-2')}>$</span>
            <input type="text" defaultValue={bill} className={clsx('form-control')} aria-describedby="bill"></input>
          </Col>
        </Row>
        <Button>Update</Button>
      </form>
    </Container>
  )
};

export default TableView;