const Order = require("./../models/order.model");
const Product = require("./../models/product.model");

const createOrder = async (req, res) => {
  const { items } = req.body;

  const productItems = await Product.find({
    _id: {
      $in: [items.map((item) => item.product)],
    },
  });

  const totalPrice = productItems.reduce(
    (sum, item, index) => sum + items[index].quantity * item.price,
    0
  );

  const order = await Order.create({
    ...req.body,
    user: req.userId,
    totalPrice,
  });
  res.status(201).send(order);
};

const getOrderById = async (req, res) => {
  const id = req.params.id;

  let order = await Order.findById(id);

  if (!order) {
    return res.status(404).send("Order with given id does not exist");
  }

  order = await order.populate("user");
  order = await order.populate("products");
  order = await order.populate("selectedAddress");

  order.user = {
    name: order.user.name,
  };

  res.send(order);
};

const deleteOrderById = async (req, res) => {
  const id = req.params.id;

  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    return res.status(404).send("Order with given id does not exist");
  }
  res.send(order);
};

const getOrderByUserId = async (req, res) => {
  const ordersByUser = await Order.find({
    user: req.userId,
  });
  res.send(ordersByUser);
};

const partiallyCancelOrder = async (req, res) => {
  const { id } = req.params;
  const { items: itemsToBeCancelled } = req.body;

  let order = await Order.findById(id);

  if (!order) {
    return res.status(404).send("Order with given id does not exist");
  }

  let updatedItemsInOrder = order.items.map((itemInOrder) => {
    const item = itemsToBeCancelled.find(
      (cancellableItem) => cancellableItem.product === itemInOrder.product
    );
    if (item) {
      if (itemInOrder.quantity < item.quantity) {
        return res
          .status(400)
          .send(
            "Quantity in order is less than the request cancellation quantity"
          );
      }

      if (itemInOrder.quantity === item.quantity) {
        return undefined;
      }
      itemInOrder.quantity -= item.quantity;
    }
    return itemInOrder;
  });

  const totalPrice = updatedItemsInOrder.reduce(async (total, item) => {
    const product = await Products.findById(item.product);
    return total + product.price * item.quantity;
  }, 0);

  updatedItemsInOrder = updatedItemsInOrder.filter(Boolean);
  // totalPrice

  await Order.findByIdAndUpdate(id, {
    ...order,
    items: updatedItemsInOrder,
  });

  // TotalPrice
};

// Create a new API for partial cancellation of an order

// earphones, milk, rice, dal, eggs

module.exports = {
  createOrder,
  getOrderById,
  getOrderByUserId,
  deleteOrderById,
  partiallyCancelOrder,
};
