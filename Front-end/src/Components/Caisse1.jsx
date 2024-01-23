import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Modal1 from "./Modal1";
import { useDispatch, useSelector } from "react-redux";
import { getCaisses1 } from "../Redux/Actions/Caisse1_Action";
import { CardText, Row } from "react-bootstrap";
import CustomNavBar from "./Navbar";

function Caisse1(caisse) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCaisses1());
  }, [dispatch]);

  const caisses = useSelector((state) => state.caisses1.caisses);

  return (
    <>
      <CustomNavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row style={{ gap: "30px" }}>
          {caisses.map(
            (caisse) => (
              console.log(caisse),
              (
                <Card
                  key={caisse._id}
                  style={{
                    width: "28rem",
                    marginTop: "30px",
                    backgroundColor: "rgba(0, 126, 127, 0.75)",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "#FFF7D6",
                      }}
                    >
                      <h1>{caisse.Title} </h1>
                    </Card.Title>
                    <div style={{ display: "flex" }}>
                      <Card.Text
                        style={{
                          color: "#FFF7D6",
                          fontSize: "25px",
                          fontWeight: "bold",
                        }}
                      >
                        Recette:
                      </Card.Text>
                      <CardText
                        style={{
                          color: "#FFF7D6",
                          fontSize: "25px",
                          marginLeft: "10px",
                        }}
                      >
                        {caisse.Recette[0].montant}
                      </CardText>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Card.Text
                        style={{
                          color: "#FFF7D6",
                          fontSize: "25px",
                          fontWeight: "bold",
                        }}
                      >
                        Espece:
                      </Card.Text>
                      <Card.Text
                        style={{
                          color: "#FFF7D6",
                          fontSize: "25px",
                          marginLeft: "10px",
                        }}
                      >
                        {caisse.Liquide.montantLiquide}
                      </Card.Text>
                    </div>

                    {/* accordion for CHEQUE statemens */}
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Cheque stamtements</Accordion.Header>
                        <Accordion.Body>
                          <div style={{ display: "flex" }}>
                            <div
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                              }}
                            >
                              Cheque N°:
                            </div>
                            <div
                              style={{
                                fontSize: "18px",
                                marginLeft: "10px",
                                fontWeight: "400",
                              }}
                            >
                              {caisse.Cheques[0].NumeroDeCheque}
                            </div>
                            <div
                              style={{
                                fontSize: "18px",
                                marginLeft: "90px",
                                fontWeight: "500",
                              }}
                            >
                              Montant:
                            </div>
                            <div
                              style={{
                                fontSize: "18px",
                                marginLeft: "10px",
                                fontWeight: "400",
                              }}
                            >
                              {caisse.Cheques[0].MontantDeCheque}
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>

                    {/* accordion for TPE statemens */}
                    <Accordion style={{ marginTop: "5px" }}>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>TPE stamtements</Accordion.Header>
                        <Accordion.Body>
                          <div style={{ display: "flex" }}>
                            <div
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                              }}
                            >
                              N°:
                            </div>
                            <div
                              style={{
                                fontSize: "18px",
                                marginLeft: "10px",
                                fontWeight: "400",
                              }}
                            >
                              {caisse.TPEs[0].NumeroDeTransaction}
                            </div>
                            <div
                              style={{
                                fontSize: "18px",
                                marginLeft: "150px",
                                fontWeight: "500",
                              }}
                            >
                              Montant:
                            </div>
                            <div
                              style={{
                                fontSize: "18px",
                                marginLeft: "10px",
                                fontWeight: "450",
                              }}
                            >
                              {caisse.TPEs[0].MontantDeTransaction}
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Modal1 caisse={caisse} />
                  </Card.Body>
                </Card>
              )
            )
          )}
        </Row>
      </div>
    </>
  );
}

export default Caisse1;
