const productService = require('../services');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productService.getAllProducts();
  if (type) return res.status(404).json(message);
  res.status(200).json(message);
};
 
const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productService.getProductById(id);
  if (result.type) return res.status(404).json(result);
  return res.status(200).json(result.message);
};

module.exports = {
  getAllProducts,
  getProductById,
};
