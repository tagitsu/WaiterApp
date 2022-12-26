

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
// funkcja zawarta z funkcji fetchTables 
// (wywoływana przy renderowaniu aplikacji) pobiera z serwera 
// informacje o stolikach (tables)
// i w formie tablicy (tables) przekazuje je (payload) do subreducera


const updateForm = payload => ({ type: UPDATE_FORM, payload });
export const getInputsValues = () => {
  return (table, dispatch) => {
    dispatch(updateForm(table))
    console.log('jaki payload przesyłam do updateForm', table);
  }
}
// funkcja ma wpisane przez użytkownika wartości danego stolika
// przekazywać na serwer podmieniając dotychczasowe wartości
// np. użytkowinik wpisuje: 2 gości przy stoliku 1 (było 3), robi naciska Update
// inofmacja o 3 gościach przy stolkiu 1 zostaje zamieniona na 2

const tablesReducer = (statePart = [], action) => {
  switch(action.type) {
    case UPDATE_TABLES: 
      return [...action.payload]
    case UPDATE_FORM:
      return [...statePart, action.payload]
    default:
      return statePart;
  }
}

export default tablesReducer;