const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");

const createAppointment = async (req, res) => {
  // Check if doctor is valid and appointment slot is empty

  const doctorId = req.body.doctor;
  const doctor = await Doctor.findById(doctorId);

  if (!doctor) {
    return res.status(404).send("Doctor with given id does not exist");
  }

  const { appointmentDate, timeSlot } = req.body;

  // We need to check if timeslot is within the doctor's availability
  // Date in JS, how to get the day for that date?

  const dayOfWeek = new Date(appointmentDate).toLocaleString("en-US", {
    weekday: "long",
  });
  const availableDay = doctor.availability.find((day) => day === dayOfWeek);

  if (!availableDay) {
    return res.status(400).send("Doctor does not sit on the requested day");
  }

  const timeSlotExists = availableDay.timeSlots.includes(timeSlot);

  if (!timeSlotExists) {
    return res.status(400).send("The time slot does not exist for this day");
  }

  const appointmentExists = await Appointment.findOne({
    doctor: doctorId,
    appointmentDate: appointmentDate,
    timeSlot: timeSlot,
  });

  if (appointmentExists) {
    return res.status(400).send("The time slot is already booked");
  }

  const appointment = await Appointment.create({
    ...req.body,
  });
  res.status(201).send(appointment);
};

const getAppointmentById = async (req, res) => {
  const id = req.params.id;

  let appointment = await Appointment.findById(id);

  if (!appointment) {
  }

  appointment = await appointment.populate("patient");
  appointment = await appointment.populate("doctor");

  res.send(appointment);
};

const deleteAppointmentById = async (req, res) => {
  const id = req.params.id;

  const appointment = await Appointment.findByIdAndDelete(id);

  if (!appointment) {
    return res.status(404).send("Appointment with given id does not exist");
  }
  res.send(appointment);
};

const getAppointmentByUserId = async (req, res) => {
  const appointmentsByUser = await Appointment.find({
    patient: req.userId,
  });
  res.send(appointmentsByUser);
};

module.exports = {
  createAppointment,
  getAppointmentById,
  getAppointmentByUserId,
  deleteAppointmentById,
};
