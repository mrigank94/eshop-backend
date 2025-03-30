const {
  createAppointment,
  getAppointmentById,
  deleteAppointmentById,
  getAppointmentByUserId,
} = require("../controllers/appointment.controller");
const { verifyToken } = require("../middlewares/auth");

module.exports = function (app) {
  app.post("/api/v1/appointments", [verifyToken], createAppointment);

  app.get("/api/v1/appointments/:id", getAppointmentById);

  app.delete("/api/v1/appointments/:id", deleteAppointmentById);

  app.get(
    "/api/v1/appointments/users/:id",
    [verifyToken],
    getAppointmentByUserId
  );
};
