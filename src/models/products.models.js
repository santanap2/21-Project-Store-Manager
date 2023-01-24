const connection = require('./connection');

const getAllProducts = async (_req, res) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return res.status(200).json(result);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const [[result]] = await connection.execute(
    'SELECT * from StoreManager.products WHERE id = ?',
    [id],
  );
  if (!result || result.length === 0) {
    res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(result);
};

module.exports = {
  getAllProducts,
  getProductById,
};
