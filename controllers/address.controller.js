const Address = require("./../models/address.model");

const createAddress = async (req, res) => {
  const body = req.body;

  try {
    const createdAddress = await Address.create(body);
    res.status(201).send(createdAddress);
  } catch (ex) {
    return res.status(500).send("Unable to create address");
  }
};

const getAddressById = async (req, res) => {
  const id = req.params.id;

  const address = await Address.findById(id);

  if (!address) {
    return res.status(404).send("Address with given id does not exist");
  }
  res.send(address);
};

const updateAddressById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const address = await Address.findByIdAndUpdate(id, body);

  if (!address) {
    return res.status(404).send("Address with given id does not exist");
  }
  res.send(address);
};

const deleteAddressById = async (req, res) => {
  const id = req.params.id;

  const address = await Address.findByIdAndDelete(id);

  if (!address) {
    return res.status(404).send("Address with given id does not exist");
  }
  res.send(address);
};

module.exports = {
  createAddress,
  getAddressById,
  updateAddressById,
  deleteAddressById,
};
