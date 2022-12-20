import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTables } from "./redux/tablesReducer";
import Home from './components/Home/Home';



const App = () => {
  const dispatch = useDispatch();
  useEffect( () => dispatch(fetchTables()), [dispatch]);

  return(
    <div className="App">
      <Home />
      
    </div>
  );
};

export default App;