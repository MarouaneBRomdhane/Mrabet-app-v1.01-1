const express = require("express");
const Connectdb = require("./Config/Config");
const UserRouter = require("./Routers/User_Router");
const CaisseRouter = require("./Routers/Caisse1_Router");
const CaisseEventRouter = require("./Routers/Caisse_event_Router");
const cors = require("cors");
const ProductstRouter = require("./Routers/Achat_Router");
const BankCaisseRouter = require("./Routers/Bank_caisse_Router");
const app = express();
const port = 8000;

Connectdb();
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use("/user", UserRouter);
app.use("/caisse", CaisseRouter);
app.use("/caisseEvent", CaisseEventRouter);
app.use("/achat", ProductstRouter);
app.use("/bank", BankCaisseRouter);
app.listen(port, console.log("Server is runing at port 8000"));
