const express = require('express');
const { salesController } = require('../controllers');

const salesRouter = express.Router();

salesRouter.post('/sales', salesController.createSales);
salesRouter.get('/sales', salesController.getSales);
salesRouter.get('/sales/:id', salesController.getSaleById);

module.exports = salesRouter;
