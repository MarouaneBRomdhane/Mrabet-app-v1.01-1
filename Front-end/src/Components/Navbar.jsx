import { Container, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

function CustomNavBar() {
  const user = useSelector((state) => state.users.user);
  console.log(user);
  return (
    <Navbar style={{ backgroundColor: "#01131f" }}>
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Button> Achat </Button>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ color: "#FFF7D6" }}>
            Signed in as: {user.Name}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavBar;
