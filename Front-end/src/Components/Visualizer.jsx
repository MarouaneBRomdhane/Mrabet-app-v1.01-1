import Card from "react-bootstrap/Card";
import React from "react";
import { useSelector } from "react-redux";

function Visualizer() {
  const Caisses = useSelector((state) => state.caisses1.caisses);

  const totalTPETransaction = Caisses.reduce((sum, caisse) => {
    if (caisse.TPEs.length > 0) {
      const tpeSum = caisse.TPEs.reduce(
        (acc, tpe) => acc + tpe.MontantDeTransaction,
        0
      );
      return sum + tpeSum;
    } else {
      return sum;
    }
  }, 0);

  const TotalCheques = Caisses.reduce((sum, caisse) => {
    if (caisse.Cheques.length > 0) {
      const chequeSum = caisse.Cheques.reduce(
        (acc, cheque) => acc + cheque.MontantDeCheque,
        0
      );
      return sum + chequeSum;
    } else {
      return sum;
    }
  }, 0);

  const TotalRecette = Caisses.reduce((sum, caisse) => {
    if (caisse.Recette.length > 0) {
      const recetteSum = caisse.Recette.reduce(
        (acc, recette) => acc + recette.montant,
        0
      );
      return sum + recetteSum;
    } else {
      return sum;
    }
  }, 0);

  const TotalEspece = Caisses.reduce((sum, caisse) => {
    if (caisse.Liquide && caisse.Liquide.montantLiquide !== undefined) {
      return sum + caisse.Liquide.montantLiquide;
    } else {
      return sum;
    }
  }, 0);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
      {/* Card mta3 totale des recette */}
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
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
            }}
          >
            <h2>Total des recette de caisse</h2>
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {" "}
            <h1>{TotalRecette}</h1>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 totale de liquide en caisse */}
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
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
            }}
          >
            <h2> Liquide disponible en caisse</h2>
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {" "}
            <h1>{TotalEspece}</h1>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 total des cheque a encaisser*/}
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
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
            }}
          >
            <h2> Total des Cheques</h2>
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {" "}
            <h1>{TotalCheques}</h1>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Card mta3 total des transaction tpe */}
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
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
            }}
          >
            <h2> Total des transaction TPE</h2>
          </Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {" "}
            <h1>{totalTPETransaction}</h1>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Visualizer;
