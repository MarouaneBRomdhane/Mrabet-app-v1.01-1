const express = require("express");
const {
  Register,
  Login,
  GetCurrent,
} = require("../Controllers/Users_controller");
const {
  RegisterValidation,
  Validation,
} = require("../Middleware/User_Validation");
const { IsAuth } = require("../Middleware/IsAuth");

const UsersRouter = express.Router();

UsersRouter.post("/Register", Register);
UsersRouter.post("/Login", Login);
UsersRouter.get("/getCurrentUser", IsAuth, GetCurrent);

module.exports = UsersRouter;
