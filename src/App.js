import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTables } from "./redux/tablesReducer";
import Home from './components/pages/Home/Home'
import TableView from "./components/pages/TableView/TableView";
import NonFound from "./components/pages/NonFound/NonFound";
import { Routes, Route } from 'react-router-dom';
import TopBar from "./components/views/TopBar/TopBar";
import Footer from "./components/views/Footer/Footer";

const App = () => {
  const dispatch = useDispatch();
  useEffect( () => dispatch(fetchTables()), [dispatch]);

  return(
    <main>
      <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:tableId" element={<TableView />} />
          <Route path="*" element={<NonFound />} />
        </Routes>
      <Footer />
    </main>
    
  );
};

export default App;