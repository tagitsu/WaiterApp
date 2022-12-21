import { Link } from "react-router-dom";

const TopBar = () => {
 return(
  <nav>
    <ul>
      <li key="1"><Link to="/">Waiter App</Link></li>
      <li key="2"><Link to="/">Home</Link></li>
    </ul>
  </nav>
 )
};

export default TopBar;