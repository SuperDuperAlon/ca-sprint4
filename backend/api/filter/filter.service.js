const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;
const { log } = require("../../middlewares/logger.middleware");
const fs = require("fs");

async function query(text) {
  try {
    const criteria = _buildCriteria(text);
    const collection = await dbService.getCollection("stay");
    var data = await collection.find( criteria ).toArray();
    const regex = new RegExp(text, 'i')
    data = data.reduce((acc, curr) => {
        if (!acc.includes(curr.loc.city) && regex.test(curr.loc.city))
            acc.push(curr.loc.city)
        return acc
    }, [])
    return data.slice(0, 5);
  } catch (err) {
    logger.error("cannot find stays", err);
    throw err;
  }
}



function _buildCriteria(text) {
  let criteria = {};
  const txtCriteria = { $regex: new RegExp(text, "ig") };
  console.log(txtCriteria, "txt - buildCritera");
  // criteria = {
  //   "loc.country": txtCriteria,
  // }
  criteria.$or = [
    {
      "loc.country": txtCriteria,
    },
    {
      "loc.city": txtCriteria,
    },
    {
      "loc.address": txtCriteria,
    }
  ]

  return criteria;
}

module.exports = {
 
  query,
 
}
