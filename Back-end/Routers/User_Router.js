const express = require("express");
const { Register, Login } = require("../Controllers/Users_controller");
const {
  RegisterValidation,
  Validation,
} = require("../Middleware/User_Validation");

const UsersRouter = express.Router();

UsersRouter.post("/Register", Register);
UsersRouter.post("/Login", Login);

module.exports = UsersRouter;
