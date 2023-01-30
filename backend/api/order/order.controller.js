const orderService = require("./order.service.js");

const logger = require("../../services/logger.service");

async function getOrders(req, res) {
  try {
    const hostId = req.query?.host
    console.log(hostId , 'getorders backend');
    logger.debug("Getting Orders");
    // const filterBy = {
    //   where: req.query?.where || "",
    // }
    const orders = await orderService.query(hostId);
    res.json(orders);
  } catch (err) {
    logger.error("Failed to get orders", err);
    res.status(500).send({ err: "Failed to get orders" });
  }
}

async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await orderService.getById(orderId);
    console.log(orderId , 'order-controller');
    res.json(order);
  } catch (err) {
    logger.error("Failed to get order", err);
    res.status(500).send({ err: "Failed to get order" });
  }
} 

async function addOrder(req, res) {
  // const { loggedinUser } = req;

  try {
    const order = req.body;
    // order.owner = loggedinUser;
    const addedOrder = await orderService.add(order);
    res.json(addedOrder);
  } catch (err) {
    logger.error("Failed to add order", err);
    res.status(500).send({ err: "Failed to add order" });
  }
}

async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;
    const removedId = await orderService.remove(orderId);
    res.send(removedId);
  } catch (err) {
    logger.error("Failed to remove order", err);
    res.status(500).send({ err: "Failed to remove order" });
  }
}


async function updateOrder(req, res) {
  try {
    const order = req.body;
    console.log(order);
    console.log(order, 'controller');
    const orderId = req.params.id;
    const updatedOrder = await orderService.update(order, orderId);
    // console.log(updatedOrder, 'cntrlr');
    res.json(updatedOrder);
  } catch (err) {
    logger.error("Failed to update order", err);
    res.status(500).send({ err: "Failed to update order" });
  }
}



module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder,
    // addOrderMsg,
    // removeOrderMsg,
  };
  