import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Redux/Actions/Achat_Action";
import { Col, Row, Carousel, Modal } from "react-bootstrap"; // Import Carousel and Modal from react-bootstrap
import Visualizer from "./Visualizer";
import AddProduct from "./AddProduct";

function Economa() {
  const dispatch = useDispatch();
  const Caisses = useSelector((state) => state.caisses1.caisses);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const products = useSelector((state) => state.Products.products);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image click and show modal
  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);
    setShowModal(true);
  };

  return (
    <>
      <Row style={{ display: "flex" }}>
        <Col className="col-5">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: "80%",
                marginTop: "30px",
                backgroundColor: "rgba(0, 126, 127, 0.75)",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              className="Card"
            >
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFF7D6",
                    fontSize: "3rem",
                    marginBottom: "25px",
                  }}
                >
                  Liste des achats
                </Card.Title>
                <AddProduct />
                <div style={{ marginTop: "25px" }}>
                  {products.map((product) => (
                    <div
                      className="divMta3lesProduit"
                      key={product._id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "10px",
                        paddingBottom: "auto",
                        border: "1px solid #FFF7D6",
                        gap: "5px",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "auto",
                          fontSize: "30px",
                          fontWeight: "500",
                          width: "32%",
                          color: "#FFF7D6",
                          marginLeft: "10px",
                        }}
                        className="divtextmta3lesproduit"
                      >
                        {product.Name}
                      </div>
                      <div style={{ width: "30%", display: "flex" }}>
                        <div
                          style={{
                            marginTop: "auto",
                            fontSize: "30px",
                            fontWeight: "600",

                            color: "#FFF7D6",
                          }}
                          className="divtextmta3lesproduit"
                        >
                          Qte:
                        </div>

                        <div
                          style={{
                            marginTop: "auto",
                            fontSize: "30px",
                            fontWeight: "400",
                            color: "#FFF7D6",
                            marginLeft: "10px",
                          }}
                          className="divtextmta3lesproduit"
                        >
                          {product.Quantity}
                          {product.Unity}
                        </div>
                      </div>
                      <div style={{ width: "30%", display: "flex" }}>
                        <div
                          style={{
                            marginTop: "auto",
                            fontSize: "30px",
                            fontWeight: "500",
                            color: "#FFF7D6",
                            marginRight: "10px",
                          }}
                          className="divtextmta3lesproduit"
                        >
                          Prix:
                        </div>
                        <div
                          style={{
                            marginTop: "auto",
                            fontSize: "30px",
                            fontWeight: "400",
                            color: "#FFF7D6",
                            marginLeft: "-6px",
                            marginRight: "5px",
                          }}
                          className="divtextmta3lesproduit"
                        >
                          {product.Price}Dt
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col className="col-6">
          <div style={{ marginTop: "103px" }}></div>
          <Visualizer />
          <div style={{ marginTop: "103px" }}>
            {/* Add the Carousel here */}
            <Carousel>
              {products.map((product) => (
                <Carousel.Item key={product._id}>
                  <img
                    className="d-block w-100"
                    src={product.Facture}
                    onClick={() => handleImageClick(product.Facture)}
                    style={{ cursor: "pointer" }}
                  />
                  {/* You can add additional content for each carousel item if needed */}
                  <Carousel.Caption>
                    <h3>{product.Name}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        dialogClassName="modal-90w" // Custom class for 90% width
      >
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Selected Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Economa;
