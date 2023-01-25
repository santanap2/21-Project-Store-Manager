const { salesService } = require('../services');

const getSales = async (_req, res) => {
  const { type, message } = await salesService.getSales();
  if (type) return res.status(404).json(message);
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getSaleById(id);
  if (result.type) return res.status(404).json({ message: result.message });
  return res.status(200).json(result.message);
};

const createSales = async (req, res) => {
  const sale = req.body;
  const response = await salesService.createSale(sale);
  
  if (response.message === '"productId" is required') return res.status(400).json(response);

  if (response.message === '"quantity" is required') return res.status(400).json(response);

  if (response.message === '"quantity" must be greater than or equal to 1') {
    return res.status(422).json(response);
  }

  if (response.message === 'Product not found') return res.status(404).json(response);

  return res.status(201).json(response);
}; 

module.exports = {
  getSales,
  getSaleById,
  createSales,
};