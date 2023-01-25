const camelize = require('camelize');
const connection = require('./connection');

const getSales = async () => {  
  const [result] = await connection.execute(
    `SELECT sale_id, product_id, quantity, ss.date
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS ss
    WHERE sp.sale_id = ss.id
    ORDER BY sale_id, product_id`,
  );
  return camelize(result);
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, product_id, quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = (?)
    ORDER BY sale_id, product_id`,
    [id],
  );
  return camelize(result);
};

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
  getSales,
  getSaleById,
  createSale,
};