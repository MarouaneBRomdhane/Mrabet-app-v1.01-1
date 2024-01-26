import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Redux/Actions/Achat_Action";

function Economa() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Products from Redux:", products);
    dispatch(getProducts());
  }, [dispatch]);
  const products = useSelector((state) => state.Products.products);
  console.log(products);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row style={{ gap: "30px" }}>
          {products &&
            products.map((product) => (
              <Card
                key={product._id}
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
                    <h1>{product.Name} </h1>
                  </Card.Title>
                </Card.Body>
              </Card>
            ))}
        </Row>
      </div>
    </>
  );
}

export default Economa;
