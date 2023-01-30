const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getStaysByText } = require('./filter.controller')
const router = express.Router()


router.get('/', log, getStaysByText)


module.exports = router