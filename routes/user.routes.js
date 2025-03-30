const {
  getAllUsers,
  approveUser,
  deleteUser,
} = require("../controllers/admin.controller");

const { verifyToken, verifyAdmin } = require("../middlewares/auth");

module.exports = function (app) {
  app.get("/api/v1/users", [verifyToken, verifyAdmin], getAllUsers);

  app.put("/api/v1/users/:id/approve", [verifyToken, verifyAdmin], approveUser);

  app.delete("/api/v1/users/:id", [verifyToken, verifyAdmin], deleteUser);
};
