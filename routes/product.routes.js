const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/product.controller");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

module.exports = function (app) {
  app.post("/ecomm/api/v1/products", [verifyToken, verifyAdmin], createProduct);

  app.get("/ecomm/api/v1/products", getAllProducts);

  app.get("/ecomm/api/v1/products/:id", getProductById);

  app.put("/ecomm/api/v1/products/:id", updateProductById);

  app.delete(
    "/ecomm/api/v1/products/:id",
    [verifyToken, verifyAdmin],
    deleteProductById
  );
};
