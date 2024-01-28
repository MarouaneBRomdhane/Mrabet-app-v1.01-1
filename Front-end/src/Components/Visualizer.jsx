import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCaisses1 } from "../Redux/Actions/Caisse1_Action";

function Visualizer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCaisses1());
  }, [dispatch]);

  const Caisses = useSelector((state) => state.caisses1.caisses);
  console.log(Caisses);

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
        marginBottom: "30px",
        marginTop: "-80px",
      }}
    >
      {/* Card mta3 totale des recette */}
      <Card
        style={{
          width: "28rem",
          marginTop: "30px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Total des recette de caisse
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
          marginTop: "10px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginBottom: "20px",
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Liquide disponible en caisse
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
          marginTop: "10px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginBottom: "20px",
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Total des Cheques
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
          marginTop: "10px",
          backgroundColor: "rgba(0, 126, 127, 0.75)",
          borderRadius: "10px",
          height: "150px",
          marginBottom: "20px",
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#FFF7D6",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Total des transaction TPE
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
