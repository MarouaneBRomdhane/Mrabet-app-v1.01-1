import Card from "react-bootstrap/Card";
import React from "react";

function Visualizer() {
  return (
    <div>
      {" "}
      <Card
        style={{
          width: "28rem",
          marginTop: "30px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card.Title>Card Title</Card.Title>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Visualizer;
