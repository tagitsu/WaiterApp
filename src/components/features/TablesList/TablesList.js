import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Form, FormControl, FormLabel, FormText } from 'react-bootstrap';
import clsx from 'clsx';
import { removeTableRequest, addTableRequest } from "../../../redux/tablesReducer";
import { useState } from 'react';

const TablesList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tables = useSelector(state => state.tables);

  const [ id, setId ] = useState();
  const [ validated, setValidated] = useState();

  const handleRemove = (e, removingTable) => {
    e.preventDefault();
    dispatch(removeTableRequest(removingTable));
    navigate('/');
  };

  const handleChange = (e) => {
    e.preventDefault();
    let tablesNumbers = [];
    {tables.map(table => tablesNumbers.push(table.id))}
    if((tablesNumbers.filter(element => element.includes(e.target.value))).length > 0) {
      setValidated(false);
    } else if ((tablesNumbers.filter(element => element.includes(e.target.value))).length === 0 && !isNaN(e.target.value)) {
      setValidated(true);
    }
    setId(e.target.value);
  };

  const handleAdd = (e, id) => {
    e.preventDefault();
    dispatch(addTableRequest(id));
    navigate('/');
  };

  return(
    <Container className={clsx('m-1', 'p-0')}>
      <h1 className={clsx('fs-2', 'my-3')}>All Tables</h1>
      <h2 className={clsx('opacity-50', 'fs-3', 'my-3', ((tables.length) > 0 ? 'visually-hidden' : ''))}>No tables</h2>
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
        <Form className={clsx('d-flex', 'justify-content-start', 'mb-4')} validated={validated} noValidate>
          <Row>
            <Row>
              <FormLabel className={clsx('fs-4', 'mt-4')}>Add new table</FormLabel>
            </Row>
            <Col>
              <Form.Control 
              id='id' 
              value={id} 
              onChange={(e) => handleChange(e)} 
              className={clsx(validated ? 'is-valid' : 'is-invalid')}
              required
              />
              <div className="invalid-feedback">
                Select a table number that is not currently in use
              </div>
            </Col>
            <Col>
              <Button className={clsx('btn-success')} onClick={(e) => handleAdd(e, id)}>Add table</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
};

export default TablesList;