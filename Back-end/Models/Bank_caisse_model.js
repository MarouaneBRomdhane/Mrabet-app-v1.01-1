const mongoose = require("mongoose");

const BankCaisseSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Montant: { type: Number, required: true },
  Motif: { type: String, required: true },
  date: { type: String },
});
module.exports = mongoose.model("BankCaisse", BankCaisseSchema);
