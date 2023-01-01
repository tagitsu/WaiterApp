import { Button, Row, Col, Form, FormControl, FormLabel } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addTableRequest } from "../../../redux/tablesRedux";
import clsx from 'clsx';


const AddTableForm = (props) => {

  const dispatch = useDispatch();

  const [ id, setId ] = useState();
  const [ validated, setValidated ] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    let tablesNumbers = [];
    {props.tables.map(table => tablesNumbers.push(table.id))}
    if(e.target.value !== '') {
      const choosenNumber = tablesNumbers.filter(element => element.includes(e.target.value));
      if(!choosenNumber.length && !isNaN(parseInt(e.target.value))) {
        setValidated(true);
      } else {
        setValidated(false);
      };
    } else {
      setValidated('');
    }
    setId(e.target.value);
  };

  const handleAdd = (e, id) => {
    e.preventDefault();
    dispatch(addTableRequest(id));
  };

  return(
  <Form className={clsx('d-flex', 'justify-content-start', 'mb-4')} validated={validated}>
    <Row>
      <Row>
        <FormLabel className={clsx('fs-4', 'mt-4')}>Add new table</FormLabel>
      </Row>
      <Col>
        <FormControl 
        id='id' 
        value={id} 
        onChange={(e) => handleChange(e)} 
        className={clsx(validated !== '' ? validated ? 'is-valid' : 'is-invalid' : null)}
        required
        />
        <div className="invalid-feedback">
          Select a table <span className="text-decoration-underline" >number</span> that is not currently in use
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