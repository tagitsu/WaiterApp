import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { choosenTable, updateTableRequest } from '../../../redux/tablesReducer';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import clsx from 'clsx';
import { useState } from 'react';

const TableView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tableId } = useParams();
  const table = useSelector(state => choosenTable(state.tables, tableId));

  const [ status, setStatus ] = useState(table.status);
  const [ guests, setGuests ] = useState(table.guests);
  const [ maxGuests, setMaxGuests ] = useState(table.maxGuests);
  const [ bill, setBill ] = useState(table.bill);

  const handleChange = (e) => {
    e.preventDefault();
    if(e.target.id === 'status') {
      setStatus(e.target.value);
      if(e.target.value === 'free' || e.target.value === 'cleaning') {
        setBill(0);
        setGuests(0);
      } else if(e.target.value === 'busy') {
        setBill(table.bill);
        setGuests(table.guests);
      } else if(e.target.value === 'reserved') {
        setBill(20);
        setGuests(table.guests);
      }
    } else if(e.target.id === 'guests') {
      setGuests(e.target.value);
    } else if(e.target.id === 'maxGuests') {
      setMaxGuests(e.target.value);
    } else if(e.target.id === 'bill') {
      setBill(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTableRequest({ status, guests, maxGuests, bill }, tableId));
    navigate('/');
  };
  
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
              value={status} 
              className={clsx('form-select')} 
              onChange={handleChange}
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
            onChange={handleChange}
            />
            <span className={clsx('mx-2')}> / </span>
            <input 
            type="text" 
            value={maxGuests} 
            id="maxGuests" 
            className={clsx('form-control')} 
            onChange={handleChange}
            />
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
            id="bill"
            className={clsx('form-control')} 
            onChange={handleChange}
            />
          </Col>
        </Row>
        <Button type="submit" onClick={handleSubmit}>Update</Button>
      </Form>
    </Container>
  )
};

export default TableView;