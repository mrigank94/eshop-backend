const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
} = require("../controllers/doctor.controller");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

module.exports = function (app) {
  app.post("/api/v1/doctors", [verifyToken, verifyAdmin], createDoctor);

  app.get("/api/v1/doctors", getAllDoctors);

  app.get("/api/v1/doctors/:id", getDoctorById);

  app.put("/api/v1/doctors/:id", updateDoctorById);

  app.delete(
    "/api/v1/doctors/:id",
    [verifyToken, verifyAdmin],
    deleteDoctorById
  );
};
