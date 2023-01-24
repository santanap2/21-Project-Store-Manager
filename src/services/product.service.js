const productModel = require('../models');
const validateId = require('./validations/validationsInput');

const getAllProducts = async () => {
  const result = await productModel.getAllProducts();
  return { type: null, message: result };
};

const getProductById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const result = await productModel.getProductById(id);
  if (result) return { type: null, message: result };

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAllProducts,
  getProductById,
};
