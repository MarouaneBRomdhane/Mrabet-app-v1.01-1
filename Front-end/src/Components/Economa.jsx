import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Redux/Actions/Achat_Action";
import { Col, Row, Carousel, Modal } from "react-bootstrap";
import Visualizer from "./Visualizer";
import AddProduct from "./AddProduct";
import EconomaProduct from "./EconomaProduct";
import Navbar from "./Navbar";

function Economa() {
  const dispatch = useDispatch();
  const caisses = useSelector((state) => state.caisses1.caisses);
  const [totalSum, setTotalSum] = useState(0);

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

  // Calculate the sum of all valid prices in the nested structure
  const calculateTotalSum = () => {
    const newTotalSum = products.reduce((sum, product) => {
      const productPrices = product.Product.map(
        (p) => parseFloat(p.Price) || 0
      );
      return (
        sum + productPrices.reduce((priceSum, price) => priceSum + price, 0)
      );
    }, 0);
    setTotalSum(newTotalSum.toFixed(3));
  };

  useEffect(() => {
    calculateTotalSum();
  }, [products]);

  return (
    <>
      <Navbar />
      <Row style={{ display: "flex" }}>
        <Col className="col-6">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: "90%",
                height: "770px",
                overflow: "auto",
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
                  <br />
                  Total: {totalSum}
                </Card.Title>
                <AddProduct />
                <div style={{ marginTop: "25px" }}>
                  {products.map((product) => (
                    <EconomaProduct product={product} key={product._id} />
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col className="col-6">
          <div style={{ marginTop: "103px" }}>
            <Visualizer totalSum={totalSum} />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Carousel>
              {products.map((product) => (
                <Carousel.Item key={product._id}>
                  <img
                    className="d-block w-100"
                    src={product.Facture}
                    onClick={() => handleImageClick(product.Facture)}
                    style={{ cursor: "pointer" }}
                    alt={`Product ${product._id}`}
                  />
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
        dialogClassName="modal-90w"
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
