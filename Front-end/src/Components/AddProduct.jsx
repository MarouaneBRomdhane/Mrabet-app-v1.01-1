import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../Redux/Actions/Achat_Action";

const AddProduct = () => {
  const [show, setShow] = useState(false);
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState(0);
  const [Quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  const product = useSelector((state) => state.Products.products);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddProduct = () => {
    // Condition t'obligi el user bech i3abi les state el kol
    if (!Name || !Price || !Quantity) {
      alert("Please fill in all the fields.");
      return;
    }
    const newProduct = {
      Name: Name,
      Quantity: Quantity,
      Price: Price,
    };
    dispatch(addProducts(newProduct));
    handleClose();
    setName("");
    setQuantity(0);
    setPrice(0);
  };

  return (
    <div>
      {/* button to open modal */}
      <Button onClick={handleShow} className="BTN">
        Ajouter un Achat
      </Button>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}
        >
          <Modal.Title style={{ color: "#FFF7D6" }}>Journée du</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Nom du produit
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tapez le nom du produit"
                autoFocus
                style={{ marginTop: "-10px" }}
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Quantité
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Veuillez fournir la quantité achetée"
                autoFocus
                style={{ marginTop: "-10px" }}
                value={Quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Prix
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Veuillez fournir le prix payé pour le produit"
                autoFocus
                style={{ marginTop: "-10px" }}
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            {/* Uploader les image scanner des ticket de caisse */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{
                  color: "#FFF7D6",
                  fontSize: "25px",
                  marginTop: "10px",
                }}
              >
                Ticket de caisse
              </Form.Label>
              <Form.Control
                type="file"
                placeholder="Inserer le montant du ticket de caisse"
                autoFocus
                style={{ marginTop: "-10px" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          {/* boutton pour valider la journée */}
          <Button className="BTN-CHQTPE" onClick={handleAddProduct}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProduct;
