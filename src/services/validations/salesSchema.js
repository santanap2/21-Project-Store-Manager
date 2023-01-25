const joi = require('joi');

const joiProductId = joi.number().integer().min(1).required();

const joiProductQuantity = joi.required();

const joiProductMinQuantity = joi.number().integer().min(1);

module.exports = {
  joiProductId,
  joiProductQuantity,
  joiProductMinQuantity,
};
