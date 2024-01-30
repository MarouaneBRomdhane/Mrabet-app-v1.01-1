import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
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

  const [temporaryProduct, setTemporaryProduct] = useState([]);

  const dispatch = useDispatch();

  const product = useSelector((state) => state.Products.products);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addSingleProduct = () => {
    // Condition t'obligi el user bech i3abi les state el kol

    if (!Name || !Price || !Quantity) {
      alert("Please fill in all the fields.");
      return;
    }
    const newTemporaryProduct = {
      Name: Name,
      Quantity: Quantity,
      Price: Price,
      Unity: selectedOption,
    };
    setTemporaryProduct([...temporaryProduct, newTemporaryProduct]);
    setName("");
    setQuantity(0);
    setPrice(0);
  };

  const handleAddProduct = () => {
    const newProduct = {
      Facture: Facture,
      Product: temporaryProduct,
    };

    dispatch(addProducts(newProduct));
    setName("");
    setQuantity(0);
    setPrice(0);
    setFacture("");
    setTemporaryProduct([]);
    handleClose();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUri = e.target.result;
        setFacture(dataUri);
        console.log(dataUri);
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
            {/* Uploader l'image scanner de la FACTURE*/}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{
                  color: "#FFF7D6",
                  fontSize: "25px",
                  marginTop: "10px",
                }}
              >
                Facture
              </Form.Label>
              <Form.Control
                onChange={(e) => handleImageChange(e)}
                type="file"
                placeholder="Inserer le montant du ticket de caisse"
                autoFocus
                style={{ marginTop: "-10px" }}
                accept="image/*"
              />
            </Form.Group>
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

            {/* Button on the same line to add signle PRODUCT */}

            <Button
              className="BTN-CHQTPE"
              onClick={addSingleProduct}
              style={{ marginLeft: "375px", marginBottom: "20px" }}
            >
              Ajouter
            </Button>

            {/* Champs pour verifier les PRODUIT ajouter avant de valider l'ajout */}
            <div style={{ height: "100px", overflow: "auto" }}>
              {temporaryProduct.map((product) => (
                <div
                  key={product._id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "8px",
                    borderBottom: "1px solid #FFF7D6",
                    paddingBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      marginRight: "5px",
                      marginTop: "-2px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      width: "180px",
                    }}
                  >
                    {product.Name}
                  </div>
                  <div
                    style={{
                      marginTop: "-2px",
                      marginRight: "5px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      width: "150px",
                    }}
                  >
                    {product.Quantity}
                    {product.Unity}
                  </div>{" "}
                  <div
                    style={{
                      marginTop: "-2px",
                      marginRight: "5px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.Price}dt
                  </div>
                </div>
              ))}
            </div>
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
