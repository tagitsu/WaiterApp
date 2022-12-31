import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTables } from "./redux/tablesRedux";
import Home from './components/pages/Home/Home'
import TableView from "./components/pages/TableView/TableView";
import NonFound from "./components/pages/NonFound/NonFound";
import { Routes, Route } from 'react-router-dom';
import TopBar from "./components/views/TopBar/TopBar";
import Footer from "./components/views/Footer/Footer";
import Container from 'react-bootstrap/Container';

const App = () => {
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(false);
  console.log('app loading', loading);
  // export const API_URL = process.env.NODE_ENV === 'production' ?  '/api' : 'http://localhost:3131/api';
  useEffect(() => {console.log('effect fetchTables runs'); dispatch(fetchTables(setLoading))}, [dispatch]);

  return(
    <Container className="h-100">
      <TopBar />
        <Routes>
          <Route path="/" element={<Home loading={loading} />} />
          <Route path="/table/:tableId" element={<TableView />} />
          <Route path="*" element={<NonFound />} />
        </Routes>
      <Footer />
    </Container>
  );
};

export default App;