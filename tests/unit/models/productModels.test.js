const { expect } = require('chai');
const sinon = require('sinon');
const productModels = require('../../../src/models/products.models');
const connection = require('../../../src/models/connection');
const productsMock = require('./mocks/products.mock');


describe('Testa os produtos da camada Models', () => {
  it('Testa se todos os produtos são mostrados na rota "/products"', async () => {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const result = await productModels.getAllProducts();

    expect(result).to.be.deep.equal(productsMock);
  });
})