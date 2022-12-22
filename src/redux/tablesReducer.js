

// selectors

export const choosenTable = (tables, tableId) => {
  return tables.find(table => table.id === tableId);
};

// action names

const createActionName = name => `app/tables/${name}`;

const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_FORM = createActionName('UPDATE_FORM');
// action creators

const updateTables = payload => ({ type: UPDATE_TABLES, payload});
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
  }
};

const updateForm = payload => ({ type: UPDATE_FORM, payload });
export const getInputsValues = () => {
  return (dispatch, table) => {
    dispatch(updateForm(table))
  }
}

const tablesReducer = (statePart = [], action) => {
  switch(action.type) {
    case UPDATE_TABLES: 
      return [...action.payload]
    case UPDATE_FORM: 
      return statePart.map(table => (table.status !== action.payload) ? { ...table, status: (action.payload) } : table);
    default:
      return statePart;
  }
}

export default tablesReducer;