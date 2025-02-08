const Product = require("./../models/product.model");

const createProduct = async (req, res) => {
  const body = req.body;
  const createdProduct = await Product.create(body);
  res.status(201).send(createdProduct);
};

const getAllProducts = async (req, res) => {
  const {
    sortBy = "name",
    order = "ASC",
    rating_min = 0,
    rating_max = 5,
    keyword = "",
  } = req.query;

  const sortOrder = order === "DESC" ? -1 : 1;

  const products = await Product.find({
    rating: {
      $lte: rating_max,
      $gte: rating_min,
    },
    name: new RegExp(keyword, "i"),
  }).sort({
    [sortBy]: sortOrder,
  });

  res.send(products);
};

// $lt => less than
// $lte => less than equal
// $gt => greater than
// $gte => greater than or equal
// $ne => not equal
// $in => in array
// $nin => not in array

// Regular exp
// Green tea, black tea, darjeeling tea, ripple tea

const getProductById = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id).select("name description");

  if (!product) {
    return res.status(404).send("Product with given id does not exist");
  }
  res.send(product);
};

const updateProductById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const product = await Product.findByIdAndUpdate(id, body);

  if (!product) {
    return res.status(404).send("Product with given id does not exist");
  }
  res.send(product);
};

const deleteProductById = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).send("Product with given id does not exist");
  }
  res.send(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
