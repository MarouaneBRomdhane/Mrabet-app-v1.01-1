const Users = require("../Models/Users_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.Register = async (req, res) => {
  const { Name, Password } = req.body;
  try {
    const found = await Users.findOne({ Name });
    console.log(found);
    if (found) {
      res.status(400).send({ msg: "The user you want to add aleready exist" });
    } else {
      const NewPassword = bcrypt.hashSync(Password, 10); //password hashed x10
      const User = new Users({ Name, Password: NewPassword });
      const SecretKey = "160592050199271021";
      const Token = jwt.sign({ id: User._id }, SecretKey);
      await User.save();
      res.status(200).send({
        msg: "Utilisateur ajouté avec succès à la base de données.",
        User,
        Token,
      });
    }
  } catch (error) {
    res.status(500).send(error);
    if (error) throw error;
  }
};

exports.Login = async (req, res) => {
  const { Name, Password } = req.body;
  try {
    const found = await Users.findOne({ Name });
    if (!found) {
      res
        .status(400)
        .send({ errors: [{ msg: "nom d'utilisateur incorrect" }] });
    } else {
      const ComparedPassword = bcrypt.compareSync(Password, found.Password);
      if (!ComparedPassword) {
        res.status(400).send({ errors: [{ msg: "mot de passe incorrect!!" }] });
      } else {
        const SecretKey = "160592050199271021";
        const Token = jwt.sign({ id: found._id }, SecretKey);
        res
          .status(200)
          .send({ msg: "Connecté avec succès!!", User: found, Token });
      }
    }
  } catch (error) {
    res.status(500).send(error);
    if (error) throw error;
  }
};
exports.GetCurrent = (req, res) => {
  res.status(200).send({ user: req.user });
};
