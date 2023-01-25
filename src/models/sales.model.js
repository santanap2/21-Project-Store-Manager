const connection = require('./connection');

// const getSales = async () => {
//   const result = await connection.execute(
//     'SELECT * FROM StorageManager.sales',
//   );
//   return result;
// };

// const getSaleById = async (id) => {
//   const result = await connection.execute(
//     'SELECT * FROM StoreManager.sales WHERE ID = ?',
//     [id],
//   );
//   return result;
// };

const createSale = async (sale) => {
  const [{ insertId }] = await connection.execute(
  'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
);
  sale.forEach(async (item) => {
    const { productId, quantity } = item;
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [insertId, productId, quantity],
    );
  });

  const result = { id: insertId, itemsSold: sale };
  return result;
};

module.exports = {
  // getSales,
  // getSaleById,
  createSale,
};