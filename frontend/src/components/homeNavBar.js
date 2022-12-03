import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function homeNavBar() {
  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className='ms-4' href="./"><h2>Welcome Vance!</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav className="me-5">
            <Nav.Link> Account </Nav.Link>
            <Nav.Link> Log Out </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default homeNavBar;
