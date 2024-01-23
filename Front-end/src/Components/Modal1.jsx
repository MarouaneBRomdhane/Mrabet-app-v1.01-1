import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCaisse1 } from "../Redux/Actions/Caisse1_Action";

const Modal1 = ({ caisse }) => {
  const [show, setShow] = useState(false);

  const [montant, setMontant] = useState(0);
  const [montantLiquide, setmontantLiquide] = useState(0);
  const [NumeroDeCheque, setNumeroDeCheque] = useState(0);
  const [MontantDeCheque, setMontantDeCheque] = useState(0);
  const [NumeroDeTransaction, setNumeroDeTransaction] = useState(0);
  const [MontantDeTransaction, setMontantDeTransaction] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const disptach = useDispatch();

  const Caisses = useSelector((state) => state.caisses1.caisses);

  const Cheques = Caisses.find((e) => e._id === caisse._id).Cheques;

  const handleUpdateCaisse1 = () => {
    const updatedCaisse = {
      Recette: [{ montant }],
      Liquide: { montantLiquide },
      Cheques: [{ NumeroDeCheque, MontantDeCheque }],
      TPEs: [{ NumeroDeTransaction, MontantDeTransaction }],
    };

    disptach(updateCaisse1(caisse._id, updatedCaisse))
      .then(() => {
        handleClose();
      })
      .catch((error) => {});
  };

  const handleSingleCheque = () => {
    disptach(
      updateCaisse1(caisse._id, {
        ...caisse,
        Cheques: [...caisse.Cheques, { NumeroDeCheque, MontantDeCheque }],
      })
    );
    setMontantDeCheque(0);
  };

  const handleSingleTpe = () =>
    dispatchEvent(
      updateCaisse1(caisse._id, {
        ...caisse,
        TPEs: [...caisse.TPEs, { NumeroDeTransaction, MontantDeTransaction }],
      })
    );

  return (
    <div>
      {/* button to open modal */}
      <Button onClick={handleShow} className="validation-btn-caisse1">
        Editer journée
      </Button>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}
        >
          <Modal.Title style={{ color: "#FFF7D6" }}>
            Journée du {Date(24, 0, 2022)}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Recette
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserer le montant du ticket de caisse"
                autoFocus
                style={{ marginTop: "-10px" }}
                onChange={(e) => setMontant(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#FFF7D6", fontSize: "25px" }}>
                Espece
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserer le montant du liquide disponible en caisse"
                autoFocus
                style={{ marginTop: "-10px" }}
                onChange={(e) => setmontantLiquide(e.target.value)}
                value={montantLiquide}
              />
            </Form.Group>
          </Form>

          {/* FIelds to add single CHEQUE statments */}
          <Row style={{ marginTop: "20px" }}>
            <h5 style={{ color: "#FFF7D6", fontSize: "25px" }}>Cheques</h5>
          </Row>
          <Row style={{ marginTop: "-10px" }}>
            <Form.Label
              column
              md={6}
              sm={6}
              className="mb-0.5 mt-0.5 d-flex align-items-center"
              style={{ color: "#FFF7D6", fontSize: "18px" }}
            >
              Montant
              <Form.Control
                type="number"
                placeholder="Montant"
                style={{ marginLeft: "15px" }}
                onChange={(e) => setMontantDeCheque(e.target.value)}
                value={MontantDeCheque}
              />
            </Form.Label>
            <Form.Label
              column
              md={4}
              sm={4}
              className="mb-0.5 mt-0.5 d-flex align-items-center"
              style={{ color: "#FFF7D6", fontSize: "18px" }}
            >
              N°
              <Form.Control
                type="number"
                style={{ marginLeft: "15px" }}
                placeholder="N°"
                onChange={(e) => setNumeroDeCheque(e.target.value)}
              />
            </Form.Label>

            {/* Button on the same line to add signle CHEQUE statement*/}
            <Col md={2} sm={2} ml={1} className="d-flex align-items-center">
              <Button
                className="validation-btn-add-chequeandtpe-modal"
                onClick={handleSingleCheque}
              >
                Ajouter
              </Button>
            </Col>
          </Row>
          <div style={{ height: "150px", overflow: "auto" }}>
            {Cheques.map((cheque) => (
              <div>
                montant:{cheque.MontantDeCheque}N°:{cheque.NumeroDeCheque}
              </div>
            ))}
          </div>

          {/* FIelds to add single TPE statments */}
          <Row style={{ marginTop: "20px" }}>
            <h5 style={{ color: "#FFF7D6", fontSize: "25px" }}>TPE</h5>
          </Row>
          <Row style={{ marginTop: "-10px" }}>
            <Form.Label
              column
              md={6}
              sm={6}
              className="mb-0.5 mt-0.5 d-flex align-items-center"
              style={{ color: "#FFF7D6", fontSize: "18px" }}
            >
              Montant
              <Form.Control
                type="number"
                placeholder="Montant"
                style={{ marginLeft: "15px" }}
                onChange={(e) => setMontantDeTransaction(e.target.value)}
              />
            </Form.Label>
            <Form.Label
              column
              md={4}
              sm={4}
              className="mb-0.5 mt-0.5 d-flex align-items-center"
              style={{ color: "#FFF7D6", fontSize: "18px" }}
            >
              N°
              <Form.Control
                type="number"
                style={{ marginLeft: "15px" }}
                placeholder="N°"
                onChange={(e) => setNumeroDeTransaction(e.target.value)}
              />
            </Form.Label>
            {/* Button on the same line to add signle TPE statement*/}
            <Col md={2} sm={2} className="d-flex align-items-center">
              <Button
                className="validation-btn-add-chequeandtpe-modal"
                onClick={handleSingleTpe}
              >
                Ajouter
              </Button>
            </Col>
          </Row>
          <Row>
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
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgba(0, 126, 127, 0.75)" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="sauvegarde-btn-add-chequeandtpe-modal"
            onClick={handleUpdateCaisse1}
          >
            Sauvegareder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modal1;
