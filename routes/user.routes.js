const {
  getAllUsers,
  approveUser,
  deleteUser,
} = require("../controllers/admin.controller");

const { verifyToken, verifyAdmin } = require("../middlewares/auth");

module.exports = function (app) {
  app.get("/ecomm/api/v1/users", [verifyToken, verifyAdmin], getAllUsers);

  app.put(
    "/ecomm/api/v1/users/:id/approve",
    [verifyToken, verifyAdmin],
    approveUser
  );

  app.delete("/ecomm/api/v1/users/:id", [verifyToken, verifyAdmin], deleteUser);
};
