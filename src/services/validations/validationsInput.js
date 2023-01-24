const { idSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'WRONG_ID', message: 'Insert a valid ID' };
  return { type: null, message: null };
};

module.exports = validateId;