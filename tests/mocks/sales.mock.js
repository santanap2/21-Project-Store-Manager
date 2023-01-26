const salesMock = [
  { saleId: 1, productId: 1, quantity: 5, date: '2023-01-26T03:03:55.000Z' },
  { saleId: 1, productId: 2, quantity: 10, date: '2023-01-26T03:03:55.000Z' },
  { saleId: 2, productId: 3, quantity: 15, date: '2023-01-26T03:03:55.000Z' },
];

const missingProductIdMock = {
  quantity: 5,
};

const missingQuantityMock = {
  productId: 1,
};

const lowQuantityMock = {
  productId: 1,
  quantity: 0,
};

const nonExistentProductMock = {
  productId: 999,
  quantity: 2,
};

const correctReponseMock = {
  id: 3,
  itemsSold: [
    { productId: 2, quantity: 1 },
    { productId: 1, quantity: 5 }
  ],
};

const saleFindById = [
  {
    date: "2023-01-16 22:10:50",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2023-01-16 22:10:50",
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  salesMock,
  missingProductIdMock,
  missingQuantityMock,
  lowQuantityMock,
  nonExistentProductMock,
  correctReponseMock,
  saleFindById,
}