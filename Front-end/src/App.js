import React from "react";
import "./BackgroundStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Caisse1 from "./Components/Caisse1";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Economa from "./Components/Economa";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Caisses1" element={<Caisse1 />} />
        <Route path="/Economa" element={<Economa />} />
      </Routes>
    </div>
  );
}

export default App;
