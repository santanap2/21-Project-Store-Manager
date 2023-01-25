const express = require('express');
const { createSales } = require('../controllers');

const salesRouter = express.Router();

salesRouter.get('/sales', (_req, res) => res.status(200).json({ message: '/SALES FUNCIONANDO' }));

// salesRouter.post('/sales', async (req, res) => {
//   const sale = req.body;
//   const result = await salesModel.createSale(sale);
//   return res.status(201).json(result);
// });

salesRouter.post('/sales', createSales);

module.exports = salesRouter;
