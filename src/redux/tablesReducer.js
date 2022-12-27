

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

// funkcja zawarta z funkcji fetchTables 
// (wywoływana przy renderowaniu aplikacji) pobiera z serwera 
// informacje o stolikach (tables)
// i w formie tablicy (tables) przekazuje je (payload) do subreducera

const updateTables = payload => ({ type: UPDATE_TABLES, payload});
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
  }
};


// funkcja ma wpisane przez użytkownika wartości danego stolika
// przekazywać na serwer podmieniając dotychczasowe wartości
// np. użytkowinik wpisuje: 2 gości przy stoliku 1 (było 3), robi naciska Update
// inofmacja o 3 gościach przy stolkiu 1 zostaje zamieniona na 2

export const updateTable = payload => ({ type: UPDATE_TABLE, payload });
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

const removeTable = payload => ({ type: REMOVE_TABLE, payload });
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
    fetch(`http://localhost:3131/tables/`, options)
    .then((res) => res.json())
    .then((data) => dispatch(addTable(newTable)));
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