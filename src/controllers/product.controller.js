const { productService } = require('../services');

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

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.insertProduct(name);

  if (type) {
    return res.status(400).json({ message: 'There was an error during creating a product' });
  }

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productService.updateProduct({ name, id });
  if (result.type) return res.status(404).json({ message: result.message });
  return res.status(200).json(result.message);
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
};
