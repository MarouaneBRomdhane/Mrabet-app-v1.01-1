const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Price: { type: Number, required: true },
    Unity: { type: String, required: true },
    Facture: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductSchema);
