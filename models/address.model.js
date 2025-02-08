const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  location: { type: String, require: true },
  landmark: String,
  city: { type: String, require: true },
  state: { type: String, require: true },
  country: { type: String, require: true },
  postalcode: { type: Number, require: true },
});

module.exports = mongoose.model("Address", addressSchema);
