const {
  createAddress,
  getAddressById,
  updateAddressById,
  deleteAddressById,
} = require("../controllers/address.controller");

module.exports = function (app) {
  app.post("/ecomm/api/v1/addresses", createAddress);

  app.get("/ecomm/api/v1/addresses/:id", getAddressById);

  app.put("/ecomm/api/v1/addresses/:id", updateAddressById);

  app.delete("/ecomm/api/v1/addresses/:id", deleteAddressById);
};
