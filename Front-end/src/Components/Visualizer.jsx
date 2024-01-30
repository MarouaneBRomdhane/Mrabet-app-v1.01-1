import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { getCaisses1 } from "../Redux/Actions/Caisse1_Action";
import { getCaissesEvent } from "../Redux/Actions/CaisseEvent_Actions";
import { getBank_Caisses } from "../Redux/Actions/Bank_Caisses_Action";
import BankCaisseModal from "./BankCaisseModal";
import Economa from "./Economa";
import { CardText, Row } from "react-bootstrap";

function Visualizer({ totalSum }) {
  const dispatch = useDispatch();
  const caisses1 = useSelector((state) => state.caisses1.caisses);
  const caissesEvent = useSelector((state) => state.caissesEvent.caisses);
  const bankCaisses = useSelector((state) => state.BankCaisses.BankCaisses);
  const [totalSumFromEconoma, setTotalSumFromEconoma] = useState(0);

  useEffect(() => {
    dispatch(getCaisses1());
    dispatch(getCaissesEvent());
    dispatch(getBank_Caisses());
  }, [dispatch]);

  // Calculate Liquide disponible en caisse
  let TotalEspece = caisses1.reduce((sum, caisse) => {
    if (caisse.Liquide && caisse.Liquide.montantLiquide !== undefined) {
      return sum + caisse.Liquide.montantLiquide;
    } else {
      return sum;
    }
  }, 0);

  caissesEvent.forEach((caisse) => {
    if (caisse.Liquide && caisse.Liquide.montantLiquide !== undefined) {
      TotalEspece += caisse.Liquide.montantLiquide;
    }
  });

  bankCaisses.forEach((caisse) => {
    if (caisse.Montant !== undefined) {
      TotalEspece += caisse.Montant;
    }
  });

  // Subtract totalSumFromEconoma from Liquide disponible en caisse
  let LiquideDisponibleEnCaisse = TotalEspece - totalSum;

  // Calculate Total des recette de caisse
  let TotalRecette = caisses1.reduce((sum, caisse) => {
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

  caissesEvent.forEach((caisse) => {
    if (caisse.Recette.length > 0) {
      TotalRecette += caisse.Recette.reduce(
        (acc, recette) => acc + recette.montant,
        0
      );
    }
  });

  // Calculate Total des Cheques
  let TotalCheques = caisses1.reduce((sum, caisse) => {
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

  caissesEvent.forEach((caisse) => {
    if (caisse.Cheques.length > 0) {
      TotalCheques += caisse.Cheques.reduce(
        (acc, cheque) => acc + cheque.MontantDeCheque,
        0
      );
    }
  });

  // Calculate Total des transaction TPE
  let totalTPETransaction = caisses1.reduce((sum, caisse) => {
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

  caissesEvent.forEach((caisse) => {
    if (caisse.TPEs.length > 0) {
      totalTPETransaction += caisse.TPEs.reduce(
        (acc, tpe) => acc + tpe.MontantDeTransaction,
        0
      );
    }
  });

  useEffect(() => {
    // Logic to get totalSum from Economa component
    const newTotalSumFromEconoma = totalSum; // Assuming totalSum is a number
    setTotalSumFromEconoma(newTotalSumFromEconoma);
  }, [totalSum, caisses1, caissesEvent, bankCaisses]);

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
        className="Card"
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
        className="Card"
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
            <h1>{LiquideDisponibleEnCaisse}</h1>
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
        className="Card"
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
        className="Card"
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
