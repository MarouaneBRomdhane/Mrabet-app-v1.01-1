const express = require("express");
const Connectdb = require("./Config/Config");
const UserRouter = require("./Routers/User_Router");
const CaisseRouter = require("./Routers/Caisse1_Router");
const cors = require("cors");
const app = express();
const port = 8000;

Connectdb();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/user", UserRouter);
app.use("/caisse", CaisseRouter);
app.listen(port, console.log("Server is runing at port 8000"));
