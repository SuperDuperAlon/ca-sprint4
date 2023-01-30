const filterService = require("./filter.service.js");

const logger = require("../../services/logger.service");

async function getStaysByText(req, res) {
  try {
    logger.debug("searchByText");
    text= req.query?.text || ""
    const data = await filterService.query(text);
    res.json(data);
  } catch (err) {
    logger.error("Failed to get stays", err);
    res.status(500).send({ err: "Failed to get stays" });
  }
}

module.exports = {
  getStaysByText,
  
};
