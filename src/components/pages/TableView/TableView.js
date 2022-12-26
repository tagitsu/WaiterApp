import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { choosenTable, getInputsValues } from '../../../redux/tablesReducer';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import clsx from 'clsx';
import { useState } from 'react';

const TableView = () => {
  const dispatch = useDispatch();

  const { tableId } = useParams();
  const table = useSelector(state => choosenTable(state.tables, tableId));
  console.log('to jest state.tables', table);
  const [ status, setStatus ] = useState(table.status);
  console.log('co jest w stanie status', status);
  const [ guests, setGuests ] = useState(table.peopleAmount);
  const [ bill, setBill ] = useState(table.bill);
  const newTableState = { ...table, status: status, peopleAmount: guests, bill: bill };
  console.log('nowe dane stolika', newTableState);

  // funkcja powinna w zależności od wybranego statusu stolika zmieniać 
  // niektóre wartości inputów
  // np. przy statusie free, bill 0, guest 0, itd.
  const handleChangeStatus = e => {
    e.preventDefault();
    console.log('target.value', e.target.value); // string z wartością statusu
    setStatus(e.target.value);
    if(e.target.value === 'free' || e.target.value === 'cleaning') {
      setBill(0);
      setGuests(0);
    }
    if(e.target.value === 'busy') {
      setBill(table.bill);
      setGuests(table.peopleAmount);
    }
    if(e.target.value === 'reserved') {
      setBill(20);
      setGuests(table.peopleAmount);
    }
  }

  const changeGuestsValue = (event) => {
    setGuests(event.target.value)
  };

  const changeBillValue = (event) => {
    setBill(event.target.value)
  };

  // TODO 

  // przycisk Update
  // jego zadanie to przekazywanie nowych danych wprowadzonych przez użytkownika, zmieniają one dane na serwerze
  
  console.log('stan stolika serwer', table);
  console.log('stan stolika lokalny', tableId, status, guests, bill);
  return(
    <Container className={clsx('m-1', 'p-0', 'h-100')}>
      <h1 className={clsx('fs-2', 'my-3')}>Table {table.id}</h1>
      <Form>
        <Row className={clsx('mb-3', 'align-items-baseline')}>
          <Col className={clsx('col-2')}>
            <label htmlFor="status" className={clsx('form-label', 'fw-bold')}>Status:</label>
          </Col>
          <Col className={clsx('col-4')}>
            <select 
              id="status" 
              defaultValue={status} 
              className={clsx('form-select')} 
              aria-describedby="selectTableStatus" 
              onChange={(e) => handleChangeStatus(e)}
            >
              <option key="busy" value="busy">Busy</option>
              <option key="free" value="free">Free</option>
              <option key="reserved" value="reserved">Reserved</option>
              <option key="cleaning" value="cleaning">Cleaning</option>
            </select>
          </Col>
        </Row>
        <Row className={clsx('mb-3', 'align-items-baseline')}>
          <Col className={clsx('col-2')}>
            <label htmlFor="guests" className={clsx('form-label', 'fw-bold')}>Guests:</label>
          </Col>
          <Col className={clsx('col-4', 'd-flex', 'align-items-baseline')}>
            <input 
            type="text" 
            value={guests} 
            id="guests" 
            className={clsx('form-control')} 
            aria-describedby="amountOfGuests" 
            onChange={changeGuestsValue}
            />
            <span className={clsx('mx-2')}> / </span>
            <input type="text" defaultValue={table.maxPeopleAmount} id="maxGuests" className={clsx('form-control')} aria-describedby="maxAmountOfGuests"></input>
          </Col>
        </Row>
        <Row className={clsx('mb-3', 'align-items-baseline')}>
          <Col className={clsx('col-2')}>
            <label htmlFor="bill" className={clsx('form-label', 'fw-bold')}>Bill:</label>
          </Col>
          <Col className={clsx('col-4', 'd-flex', 'align-items-baseline')}>
            <span className={clsx('me-2')}> $</span>
            <input 
            type="text" 
            value={bill} 
            className={clsx('form-control')} 
            aria-describedby="bill" 
            onChange={changeBillValue}
            />
          </Col>
        </Row>
        <Button onClick={() => dispatch(getInputsValues(newTableState, dispatch))}>Update</Button>
      </Form>
    </Container>
  )
};

export default TableView;