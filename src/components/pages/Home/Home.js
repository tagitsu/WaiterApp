import TablesList from "../../features/TablesList/TablesList";
import { Container } from 'react-bootstrap';
import clsx from 'clsx';
import LoadingPage from "../../views/LoadingPage/LoadingPage";

const Home = (props) => {

  // // Inny sposób na loading page, 
  // // ale spinner pojawia się też gdy po prostu skasowane są wszytkie stoliki
  // const tables = useSelector( state => state.tables.length);
  // // Sprawdzam czy tablica tables w stanie loklanym zawiera elementy
  // console.log('tables in local', tables);
  // if(!tables) {
  //   return(
  //     <Spinner />
  //   )
  // }


  // Drugi sposób, gdy stała loading (App) będzie miała wartość true zwraca LoadingPage, 
  // gdy false domyślą zawartość komponentu
  console.log('props loading', props.loading);
  if(props.loading) {
    
    return(
      <LoadingPage />
    );
  } else {
      return(
      <Container className={clsx('m-1', 'p-0')}>
        <TablesList />
      </Container>
    );
    }
};

export default Home;