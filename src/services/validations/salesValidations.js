const {
  joiProductId,
  joiProductQuantity,
  joiProductMinQuantity,
} = require('./salesSchema');

const validateId = (id) => {
  const { error } = joiProductId.validate(id);
  if (error) return { message: '"productId" is required' };
  return null;
};

const validateQuantity = (quantity) => {
  const { error } = joiProductQuantity.validate(quantity);
  if (error) return { message: '"quantity" is required' };
  return null;
};

const validateMinQuantity = (quantity) => {
  const { error } = joiProductMinQuantity.validate(quantity);
  if (error) return { message: '"quantity" must be greater than or equal to 1' };
  return null;
};

const validateAll = async (sales) => {
  const test = sales.map((item) => {
    const { productId, quantity } = item;

    const id = validateId(productId);
    if (id !== null) return id;

    const valQuantity = validateQuantity(quantity);
    if (valQuantity !== null) return valQuantity;

    const minQuantity = validateMinQuantity(quantity);
    if (minQuantity !== null) return minQuantity;

    return null;
  });

  return test;
};

module.exports = {
  validateId,
  validateQuantity,
  validateMinQuantity,
  validateAll,
};
