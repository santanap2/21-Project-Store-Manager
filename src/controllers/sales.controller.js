const { createSale } = require('../services');

const createSales = async (req, res) => {
  const sale = req.body;
  const response = await createSale(sale);
  
  if (response.message === '"productId" is required') return res.status(400).json(response);

  if (response.message === '"quantity" is required') return res.status(400).json(response);

  if (response.message === '"quantity" must be greater than or equal to 1') {
    return res.status(422).json(response);
  }

  if (response.message === 'Product not found') return res.status(404).json(response);

  return res.status(201).json(response);
}; 

module.exports = {
  createSales,
};