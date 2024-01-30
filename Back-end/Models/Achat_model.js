const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Facture: { type: String },
    Product: [
      {
        Name: { type: String, required: true },
        Quantity: { type: Number, required: true },
        Price: { type: Number, required: true },
        Unity: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductSchema);
