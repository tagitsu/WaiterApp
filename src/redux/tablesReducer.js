// selectors

export const choosenTable = (tables, tableId) => {
  return tables.find(table => table.id === tableId);
};

// action names

const createActionName = name => `app/tables/${name}`;

const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');

// action creators

const updateTables = tables => ({ type: UPDATE_TABLES, payload: tables});
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
  }
};

export const updateTable = updatedTable => ({ type: UPDATE_TABLE, payload: updatedTable });
export const updateTableRequest = (updatedTable, id) => {
  return(dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTable),
    };
    fetch(`http://localhost:3131/tables/${id}`, options)
      .then(() => dispatch(updateTable(updatedTable)))
  }
};

const removeTable = removingTable => ({ type: REMOVE_TABLE, payload: removingTable });
export const removeTableRequest = (removingTable) => {
  return(dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(removingTable),
    };
    fetch(`http://localhost:3131/tables/${removingTable.id}`, options)
      .then(() => dispatch(removeTable(removingTable)))
  }
};

const addTable = newTable => ({ type: ADD_TABLE, payload: newTable });
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
    fetch(`http://localhost:3131/tables/`, options)
    .then((res) => res.json())
    .then((newTable) => dispatch(addTable(newTable)));
  }
};

const tablesReducer = (statePart = [], action) => {
  switch(action.type) {
    case UPDATE_TABLES: 
      return [...action.payload]
    case UPDATE_TABLE:
      return [...statePart, { id: statePart.length + 1, ...action.payload, }]
    case REMOVE_TABLE:
      return [...statePart, { ...action.payload }]
    default:
      return statePart;
  }
}

export default tablesReducer;