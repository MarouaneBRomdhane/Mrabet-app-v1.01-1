import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Modal1 from "./Modal1";
import { useDispatch, useSelector } from "react-redux";
import { getCaisses1 } from "../Redux/Actions/Caisse1_Action";
import { CardText, Row } from "react-bootstrap";
import CustomNavBar from "./Navbar";
import Visualizer from "./Visualizer";

function Caisse1(caisse) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCaisses1());
  }, [dispatch]);

  const Caisses = useSelector((state) => state.caisses1.caisses);

  return (
    <>
      <CustomNavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row style={{ gap: "30px" }}>
          {Caisses.map((caisse) => (
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
                      width: "100px",
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
                      width: "100px",
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
                      <div style={{ height: "100px", overflow: "auto" }}>
                        {caisse.Cheques.map((cheque) => (
                          <div
                            key={cheque._id}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginBottom: "10px",
                              borderBottom: "1px solid rgba(0, 126, 127, 0.75)",
                              paddingBottom: "5px",
                            }}
                          >
                            <div
                              style={{
                                marginRight: "5px",
                                marginTop: "-5px",
                                fontWeight: "bold",
                                fontSize: "17px",
                                width: "80px",
                              }}
                            >
                              Montant:
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                fontSize: "17px",
                                fontWeight: "500",
                                width: "120px",
                              }}
                            >
                              {cheque.MontantDeCheque}
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                marginRight: "5px",
                                fontSize: "17px",
                                fontWeight: "bold",
                              }}
                            >
                              N°:
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                marginRight: "5px",
                                fontSize: "17px",
                                fontWeight: "500",
                              }}
                            >
                              {cheque.NumeroDeCheque}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {/* accordion for TPE statemens */}
                <Accordion style={{ marginTop: "5px" }}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>TPE stamtements</Accordion.Header>
                    <Accordion.Body>
                      <div style={{ height: "100px", overflow: "auto" }}>
                        {caisse.TPEs.map((tpe) => (
                          <div
                            key={tpe._id}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginBottom: "10px",
                              borderBottom: "1px solid rgba(0, 126, 127, 0.75)",
                              paddingBottom: "5px",
                            }}
                          >
                            <div
                              style={{
                                marginRight: "5px",
                                marginTop: "-5px",
                                fontWeight: "bold",
                                fontSize: "17px",
                                width: "80px",
                              }}
                            >
                              Montant:
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                fontSize: "17px",
                                fontWeight: "500",
                                width: "120px",
                              }}
                            >
                              {tpe.MontantDeTransaction}{" "}
                              {/* Corrected variable name */}
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                marginRight: "5px",
                                fontSize: "17px",
                                fontWeight: "bold",
                              }}
                            >
                              N°:
                            </div>
                            <div
                              style={{
                                marginTop: "-5px",
                                marginRight: "5px",
                                fontSize: "17px",
                                fontWeight: "500",
                              }}
                            >
                              {tpe.NumeroDeTransaction}{" "}
                              {/* Corrected variable name */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Modal1 caisse={caisse} />
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>
      <Visualizer />
    </>
  );
}

export default Caisse1;
