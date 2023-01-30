const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const utilService = require("../../services/util.service");
const ObjectId = require("mongodb").ObjectId;
const { log } = require("../../middlewares/logger.middleware");
const fs = require("fs");

async function query(filterBy = { where: "" }) {
  try {
    console.log(filterBy, " service");
    const criteria = _buildCriteria(filterBy);
    // console.log(filterBy, 'stayService');
    console.log(criteria, "service");
    const collection = await dbService.getCollection("stay");
    var stays = await collection.find(criteria).toArray()
  
    // { 'loc.country': { '$regex': /Ista/gi } }
    // var stays = await collection.find(criteria ).toArray();

    return stays.slice(0, 20);
  } catch (err) {
    logger.error("cannot find stays", err);
    throw err;
  }
}

async function getById(stayId) {
  try {
    const collection = await dbService.getCollection("stay");
    const stay = collection.findOne({ _id: stayId });
    return stay;
  } catch (err) {
    logger.error(`while finding stay ${stayId}`, err);
    throw err;
  }
}

async function remove(stayId) {
  try {
    const collection = await dbService.getCollection("stays");
    await collection.deleteOne({ _id: stayId });
    return stayId;
  } catch (err) {
    logger.error(`cannot remove stay ${stayId}`, err);
    throw err;
  }
}

async function add(stay) {
  try {
    const collection = await dbService.getCollection("stay");
    await collection.insertOne(stay);
    return stay;
  } catch (err) {
    logger.error("cannot insert stay", err);
    throw err;
  }
}

async function update(stay) {
  try {
    const stayToSave = {
      name: stay.name,
      price: stay.price,
    };
    const collection = await dbService.getCollection("stay");
    await collection.updateOne(
      { _id: ObjectId(stay._id) },
      { $set: stayToSave }
    );
    return stay;
  } catch (err) {
    logger.error(`cannot update stay ${stayId}`, err);
    throw err;
  }
}

async function addStayMsg(stayId, msg) {
  try {
    msg.id = utilService.makeId();
    const collection = await dbService.getCollection("stay");
    await collection.updateOne(
      { _id: ObjectId(stayId) },
      { $push: { msgs: msg } }
    );
    return msg;
  } catch (err) {
    logger.error(`cannot add stay msg ${stayId}`, err);
    throw err;
  }
}

async function removeStayMsg(stayId, msgId) {
  try {
    const collection = await dbService.getCollection("stay");
    await collection.updateOne(
      { _id: ObjectId(stayId) },
      { $pull: { msgs: { id: msgId } } }
    );
    return msgId;
  } catch (err) {
    logger.error(`cannot add stay msg ${stayId}`, err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  let criteria = {};
  console.log("we here");

  const txtCriteria = { $regex: new RegExp(filterBy.where, "ig") };
  // $regex: new RegExp(filterBy.name, 'ig')
  console.log(txtCriteria, "txt - buildCritera");
  criteria = {
    "loc.address": txtCriteria,
  };

  // .country = txtCriteria
  // [
  //   {
  //       country: txtCriteria
  //   },
  //   // {
  //     city: txtCriteria
  // }
  // ]
  // console.log(criteria.loc.country, 'jkjk');
  return criteria;
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  addStayMsg,
  removeStayMsg,
}
