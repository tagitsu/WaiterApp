import { Spinner } from "react-bootstrap";

const LoadingPage = () => {
  
    return(
      <Spinner animation="border" variant="light" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
};

export default LoadingPage;