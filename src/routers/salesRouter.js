const express = require('express');
const { createSales } = require('../controllers');

const salesRouter = express.Router();

salesRouter.post('/sales', createSales);

module.exports = salesRouter;
