import { API_URL } from "../config";

// selectors

export const getAllTables = (state) => state.tables;

export const choosenTable = (tables, tableId) => {
  console.log('choosenTable', tables, tableId);
  console.log('co zwraca choosenTable', tables.find(table => table.id === tableId));
  return tables.find(table => table.id === tableId)
  // [FIX IT] 
  // co zwraca choosenTable wywołany w komponencie TableView?
  // gdy klikam w button Show more w TablesList -> obiekt - wybrany stolik
  // gdy wpisuję adres do stolika w pasku adresu -> funkcja się nie wykonuje, bo jako tables dostaje pustą tablicę
};

export const getTableById = ({ tables }, tableId) =>
  tables.find((table) => table.id === tableId);

// action names

const createActionName = name => `app/tables/${name}`;

const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');

// action creators

const updateTables = payload => ({ type: UPDATE_TABLES, payload});
export const fetchTables = (setLoading) => {
  setLoading(true);
  return (dispatch) => {
    fetch(`${API_URL}tables`)
      .then(res => res.json())
      .then(setLoading(false))
      .then(tables => dispatch(updateTables(tables)))
  }
};

export const updateTable = payload => ({ type: UPDATE_TABLE, payload });
export const updateTableRequest = (updatedTable) => {

  return(dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTable),
    };
    fetch(`${API_URL}tables/${updatedTable.id}`, options)
      .then(() => dispatch(updateTable(updatedTable)))
  }
};

const removeTable = payload => ({ type: REMOVE_TABLE, payload });
export const removeTableRequest = (id) => {
  return(dispatch) => {
    const removingId = { id };
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(removingId),
    };
    fetch(`${API_URL}tables/${id}`, options)
      .then(() => dispatch(removeTable(id)))
  }
};

const addTable = payload => ({ type: ADD_TABLE, payload });
export const addTableRequest = (id) => {
  return(dispatch) => {
    const newTable = {
      id: id,
      status: 'free',
      guests: 0,
      maxGuests: 0,
      bill: 0
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };
    fetch(`${API_URL}tables`, options)
    .then((res) => res.json())
    .then((newTable) => dispatch(addTable(newTable)));
  }
};

const tablesReducer = (statePart = [], action) => {
  switch(action.type) {
    case UPDATE_TABLES: 
      return [ ...action.payload ]
    case UPDATE_TABLE:
      return statePart.map((table) => table.id === action.payload.id ? { ...table, ...action.payload} : table)
    case REMOVE_TABLE:
      return statePart.filter((table) => table.id !== action.payload);
    case ADD_TABLE:
      return [...statePart, { ...action.payload }]
  
    default:
      return statePart;
  }
}

export default tablesReducer;