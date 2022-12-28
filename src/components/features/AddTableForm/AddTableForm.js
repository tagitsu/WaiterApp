import { Button, Row, Col, Form, FormControl, FormLabel, FormText } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addTableRequest } from "../../../redux/tablesReducer";
import clsx from 'clsx';


const AddTableForm = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ id, setId ] = useState();
  const [ validated, setValidated] = useState();


  const handleChange = (e) => {
    e.preventDefault();
    let tablesNumbers = [];
    {props.tables.map(table => tablesNumbers.push(table.id))}
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
  );
};

export default AddTableForm;