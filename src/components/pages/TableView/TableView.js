import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { choosenTable } from '../../../redux/tablesReducer';

const TableView = () => {

  const tableId = useParams();
  const tables = useSelector(state => state.tables);
  const choosenTable = (id) => {
    tables.filter( table => id === table.id);
  }
  console.log('table view selector', tables);
  console.log('table view', tableId);
  console.log('choosen', choosenTable(tableId));

  // TODO 
  // w zależności od wybranego stolika (na podstronie Home), dostaję info o id wybranego stolika
  // chcę znaleźć na serwerze odpowiedni obiekt z tablicy tables (o odpowiadającym id), 
  // aby móc w komponencie wyświetlić: id stolika, wybrać opcję zgodną z jego statusem, otrzymać w inputach odpowiednie wartości ilości gości, wysokości rachunku

  // jak w zależności od statusu wyswietlić odpowiednią opcję w elemencie select - atrybut selected ?
  // jak wstawić do inputów wartości z odpowiadających właściwości obiektu table - atrybut value ?

  // przycisk Update
  // jego zadanie to przekazywanie nowych danych wprowadzonych przez użytkownika, zmieniają one dane na serwerze
  
  return(
    <section>
      <h2>Table</h2>
      <form>
        Status
        <select>
          <option value="busy">Busy</option>
          <option value="free">Free</option>
          <option value="reserved">Reserved</option>
          <option value="cleaning">Cleaning</option>
        </select>
        People
        <input type="text"></input>
        /
        <input type="text"></input>
        Bill 
        $ <input type="text"></input>
        <button>Update</button>
      </form>
    </section>
  )
};

export default TableView;