import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LoginModal from "../components/auth/LoginModal";
import RegiterModal from "../components/auth/RegisterModal";
import { logoutHandler } from "../js/Actions/authActions";
export default function NavFct() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  //logout
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logoutHandler());
  };
  const authLinks = (
    <>
      <Link to="/Dashboard">
        <Nav.Link href="#home">Dashboard</Nav.Link>
      </Link>
      <Button onClick={logoutUser}>Logout </Button>
    </>
  );

  const visitorLinks = (
    <>
      <LoginModal />
      <RegiterModal />
    </>
  );
  return (
    <div className="Navbar">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src=""
              width="45"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">
              <Nav.Link href="#home">Home</Nav.Link>
            </Link>

            {isAuth ? authLinks : visitorLinks}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
