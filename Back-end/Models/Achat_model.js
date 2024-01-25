const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductSchema);
