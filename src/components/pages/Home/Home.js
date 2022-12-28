import TablesList from "../../features/TablesList/TablesList";
import { Container } from 'react-bootstrap';
import clsx from 'clsx';

const Home = () => {
  return (
    <Container className={clsx('m-1', 'p-0')}>
      <TablesList />
    </Container>
  );
};

export default Home;