const {
  createOrder,
  getOrderById,
  deleteOrderById,
  getOrderByUserId,
  partiallyCancelOrder,
} = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/auth");

module.exports = function (app) {
  app.post("/ecomm/api/v1/orders", [verifyToken], createOrder);

  app.get("/ecomm/api/v1/orders/:id", getOrderById);

  app.delete("/ecomm/api/v1/orders/:id", deleteOrderById);

  app.get("/ecomm/api/v1/orders/users/:id", [verifyToken], getOrderByUserId);

  app.put(
    "/ecomm/api/v1/orders/partial-cancel/:id",
    [verifyToken],
    partiallyCancelOrder
  );
};
