const { salesModel } = require('../models');
const { productsModel } = require('../models');
const { validateAll } = require('./validations/salesValidations');

const createSale = async (sale) => {
  const productExists = sale.map(async (item) => {
    const product = await productsModel.getProductById(item.productId);
    return product;
  });
  const resolvedProduct = await Promise.all(productExists);

  const notFound = resolvedProduct.some((one) => !one);
  if (notFound) return { message: 'Product not found' };

  const error = await validateAll(sale);
  if (error.some((one) => one !== null)) {
    const rightError = error.find((item) => item.message);
    return rightError;
  }

  const result = await salesModel.createSale(sale);
  return result;
};

module.exports = {
  createSale,
};
