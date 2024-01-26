import { Container, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Log_out } from "../Redux/Actions/Users_Action";
import { useNavigate } from "react-router-dom";

function CustomNavBar() {
  const user = useSelector((state) => state.users.user);
  console.log(user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
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
        <Button onClick={() => dispatch(Log_out(Navigate))}>Log_out</Button>
      </Container>
    </Navbar>
  );
}

export default CustomNavBar;
