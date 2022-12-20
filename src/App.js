import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTables } from "./redux/tablesReducer";
import Home from './components/Home/Home';
import TableView from "./components/TableView/TableView";
import NonFound from "./components/NonFound/NonFound";
import { Routes, Route } from 'react-router-dom';
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Hello from "./components/Hello/Hello";

const App = () => {
  const dispatch = useDispatch();
  useEffect( () => dispatch(fetchTables()), [dispatch]);

  return(
    <main>
      <TopBar />
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/home" element={<Home />} />
          <Route path="/table/:tableId" element={<TableView />} />
          <Route path="*" element={<NonFound />} />
        </Routes>
      <Footer />
    </main>
    
  );
};

export default App;