const { expect } = require('chai');
const sinon = require('sinon');
const productModels = require('../../../src/models');
const connection = require('../../../src/models/connection');
const productsMock = require('../../mocks/products.mock');
const { productsModel } = require('../../../src/models');

describe('Testa os produtos da camada Models', () => {
  afterEach(sinon.restore);

  it('1- Testa se todos os produtos são mostrados na rota "/products"', async () => {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const result = await productsModel.getAllProducts();

    expect(result).to.be.deep.equal(productsMock);
  });

  it('2- Testa se um produto é mostrado quando pesquisado seu Id', async () => {
    sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);

    const result = await productsModel.getProductById(1);
    
    expect(result).to.be.deep.equal(productsMock[0]);
  });
})