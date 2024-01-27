const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Price: { type: Number, required: true },
    facture: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductSchema);
