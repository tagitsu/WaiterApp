import { Link } from "react-router-dom";
import { Navbar, Container, NavItem,  } from 'react-bootstrap';
import clsx from "clsx";
import LoadingPage from "../LoadingPage/LoadingPage";

const TopBar = (props) => {
 return(
  <Navbar className={clsx('bg-primary', 'py-3', 'rounded-1')}>
    <Container className={clsx('px-3')}>
      <NavItem key="1"><Link className={clsx('navbar-brand', 'text-light')} to="/">Waiter.app</Link></NavItem>
      <NavItem key="2"><Link className={clsx('nav-link', 'text-light')} to="/">Home</Link></NavItem>
    </Container>
  </Navbar>
 )
};

export default TopBar;