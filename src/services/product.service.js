const { productsModel } = require('../models');
const { validateId } = require('./validations/validationsInput');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return { type: null, message: result };
};

const getProductById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const result = await productsModel.getProductById(id);
  if (result) return { type: null, message: result };

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insertProduct = async (name) => {
  const newProductId = await productsModel.insertProduct(name);
  const newProduct = await productsModel.getProductById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async ({ name, id }) => {
  await productsModel.updateProduct({ name, id });
  const updatedProduct = await productsModel.getProductById(id);
  if (!updatedProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: updatedProduct };
};

const deleteProduct = async (id) => {
  const productToDelete = await productsModel.getProductById(id);
  if (!productToDelete) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.deleteProduct(id);
  return {};
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
