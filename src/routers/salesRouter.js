const express = require('express');
const { salesController } = require('../controllers');

const salesRouter = express.Router();

salesRouter.post('/sales', salesController.createSales);
salesRouter.get('/sales', (_req, res) => res.status(200).json('/sales funcionando'));

module.exports = salesRouter;
