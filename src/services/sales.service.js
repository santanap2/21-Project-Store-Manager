const { salesModel } = require('../models');
const { productsModel } = require('../models');
const { validateAll } = require('./validations/salesValidations');
const { validateId } = require('./validations/validationsInput');

const getSales = async () => {
  const result = await salesModel.getSales();
  return { type: null, message: result };
};

const getSaleById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const result = await salesModel.getSaleById(id);
  if (result.length > 0) return { type: null, message: result };

  return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
};

const createSale = async (sale) => {
  const error = await validateAll(sale);
  if (error.some((one) => one !== null)) {
    const rightError = error.find((item) => item.message);
    return rightError;
  }

  const productExists = sale.map(async (item) => {
    const product = await productsModel.getProductById(item.productId);
    return product;
  });
  const resolvedProduct = await Promise.all(productExists);

  const notFound = resolvedProduct.some((one) => !one);
  if (notFound) return { message: 'Product not found' };

  const result = await salesModel.createSale(sale);
  return result;
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
};
