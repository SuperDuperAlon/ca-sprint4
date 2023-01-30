const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const utilService = require("../../services/util.service");
const ObjectId = require("mongodb").ObjectId;
const { log } = require("../../middlewares/logger.middleware");
const fs = require("fs");

async function query(hostId) {
  try {
    // console.log(filterBy, "service");
    const criteria = _buildCriteria(hostId);
    const collection = await dbService.getCollection("order");
    // console.log(collection);
    var orders = await collection.find(criteria).toArray()

    // { 'loc.country': { '$regex': /Ista/gi } }
    // var orders = await collection.find().toArray();
    // console.log(orders, "from service");
    return orders;
  } catch (err) {
    logger.error("cannot find orders", err);
    throw err;
  }
}

async function getById(hostId) {
  try {
    const collection = await dbService.getCollection("order");
    console.log(hostId);
    const order = collection.find({ "hostId": hostId });
    return order;
  } catch (err) {
    logger.error(`while finding order ${hostId}`, err);
    throw err;
  }
}

async function add(order) {
  try {
    const collection = await dbService.getCollection("order");
    await collection.insertOne(order);
    console.log('order:', order)
    return order;
  } catch (err) {
    logger.error("cannot insert order", err);
    throw err;
  }
}

async function remove(orderId) {
  try {
    const collection = await dbService.getCollection("orders");
    await collection.deleteOne({ _id: orderId });
    return orderId;
  } catch (err) {
    logger.error(`cannot remove order ${orderId}`, err);
    throw err;
  }
}

async function update(order, orderId) {
  try {
    const orderToSave = {
      status: order.status,
      totalPrice: order.totalPrice,
    };
    console.log(orderId);
    console.log(order);

    // console.log(orderToSave);
    const collection = await dbService.getCollection("order");
    // console.log(orderId);
    await collection.updateOne({ _id: ObjectId(orderId) }, { $set: order });

    // const entryToUpdate =

    return orderToSave;
  } catch (err) {
    logger.error(`cannot update order ${orderId}`, err);
    throw err;
  }
}
function _buildCriteria(hostId) {
  const criteria = {}
  if (hostId) criteria['hostId'] = hostId
  console.log(criteria, 'backend');
  return criteria
}


module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  // addOrderMsg,
  // removeOrderMsg,
};
