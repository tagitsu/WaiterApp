import { Button, Row, Col, Form, FormControl, FormLabel, FormText } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addTableRequest } from "../../../redux/tablesReducer";
import clsx from 'clsx';


const AddTableForm = (props) => {

  const dispatch = useDispatch();

  const [ id, setId ] = useState();
  const [ validated, setValidated ] = useState('');

// najpierw sprawdx później filtruj
  const handleChange = (e) => {
    e.preventDefault();
    console.log('handle change - wartość wpisana do inputa', e.target.value);
    let tablesNumbers = [];
    {props.tables.map(table => tablesNumbers.push(table.id))}
    console.log('tablesNumbers array - ze stanu lokalnego', tablesNumbers);
    if(e.target.value !== '') {
      const choosenNumber = tablesNumbers.filter(element => element.includes(e.target.value));
      // choosenNumber zwraca tablicę pustą jeśli wpisany numer nie jest wykorzystany
      // tablicę z powtarzanym numerem jeśli taki zostanie wpisany do inputa
      console.log('inputValue', choosenNumber);
      if(!choosenNumber.length) {
        setValidated(true);
      } else {
        setValidated(false);
      };
    } else {
      setValidated('');
    }
    setId(e.target.value);
    // if((tablesNumbers.filter(element => element.includes(e.target.value))).length > 0) {
    //   setValidated(e.target.value === '' ? '' : false);
    // } else if ((tablesNumbers.filter(element => element.includes(e.target.value))).length === 0 && !isNaN(e.target.value)) {
    //   setValidated(true);
    // }
    
  };

  const handleAdd = (e, id) => {
    e.preventDefault();
    console.log('handle add');
    dispatch(addTableRequest(id));
  };


  return(
  <Form className={clsx('d-flex', 'justify-content-start', 'mb-4')} validated={validated} onSubmit={(e) => handleAdd(e, id)} >
    <Row>
      <Row>
        <FormLabel className={clsx('fs-4', 'mt-4')}>Add new table</FormLabel>
      </Row>
      <Col>
        <Form.Control 
        id='id' 
        value={id} 
        onChange={(e) => handleChange(e)} 
        className={clsx(validated !== '' ? validated ? 'is-valid' : 'is-invalid' : null)}
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