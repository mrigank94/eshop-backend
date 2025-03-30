const Doctor = require("../models/doctor.model");

const createDoctor = async (req, res) => {
  const body = req.body;
  const createdDoctor = await Doctor.create(body);
  res.status(201).send(createdDoctor);
};

const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find();

  res.send(doctors);
};

const getDoctorById = async (req, res) => {
  const id = req.params.id;

  const doctor = await Doctor.findById(id).select("name description");

  if (!doctor) {
    return res.status(404).send("Doctor with given id does not exist");
  }
  res.send(doctor);
};

const updateDoctorById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const doctor = await Doctor.findByIdAndUpdate(id, body);

  if (!doctor) {
    return res.status(404).send("Doctor with given id does not exist");
  }
  res.send(doctor);
};

const deleteDoctorById = async (req, res) => {
  const id = req.params.id;

  const doctor = await Doctor.findByIdAndDelete(id);

  if (!doctor) {
    return res.status(404).send("Doctor with given id does not exist");
  }
  res.send(doctor);
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
};
