const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true, min: 1 },
  description: String,
  quantity: { type: Number, min: 1, require: true },
  imageUrl: String,
  rating: Number,
});

module.exports = mongoose.model("Product", productSchema);
