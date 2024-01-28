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
  const [Facture, setFacture] = useState("");
  const [Unity, setUnity] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

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
      Facture: Facture,
      Unity: selectedOption,
    };
    dispatch(addProducts(newProduct));
    handleClose();
    setName("");
    setQuantity(0);
    setPrice(0);
    setFacture("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set the canvas dimensions to the image dimensions
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0);

          // Convert the canvas content to a data URI with aggressive compression (adjust as needed)
          const dataUri = canvas.toDataURL("image/jpeg", 0.6);

          setFacture(dataUri);
          console.log(dataUri);
        };
      };

      reader.readAsDataURL(file);
    }
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
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setSelectedOption(e.target.value)}
              value={selectedOption}
            >
              <option>Veuillez sélectionner le type d'unité</option>
              <option value="Lt">Litre</option>
              <option value="Kg">Kg</option>
              <option value="Pck">Pack</option>
            </Form.Select>
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
                value={Facture}
                onChange={(e) => handleImageChange(e)}
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
