const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product;
};

const insertProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const updateProduct = async ({ name, id }) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products SET name = '${name}' WHERE id = ${id}`,
  );
  return result;
};

// const deleteProduct = async (id) => {
//   await connection.execute(
//     `DELETE FROM StoreManager.products WHERE id = ${id}`,
//   );
//   return {};
// };

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  // deleteProduct,
};