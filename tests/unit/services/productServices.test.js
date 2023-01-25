const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const productsMock = require('../../mocks/products.mock');

describe('Testa os produtos da camada Service', () => {
  afterEach(sinon.restore);

  it('1- Testa se todos os produtos são mostrados na rota "/products"', async () => {
    sinon.stub(productsModel, 'getAllProducts').resolves(productsMock);

    const result = await productService.getAllProducts();

    expect(result.message).to.be.deep.equal(productsMock);
  });

  it('2- Testa se um produto é mostrado quando pesquisado seu Id', async () => {
    sinon.stub(productsModel, 'getProductById').resolves(productsMock[0]);

    const { message } = await productService.getProductById(1);

    expect(message).to.be.equal(productsMock[0]);
  });

  it('3- Testa se a mensagem "Product not found" é exibida quando o produto não existe', async () => {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);

    const result = await productService.getProductById(999);

    const notFound = { "type": "PRODUCT_NOT_FOUND", "message": "Product not found" };
    expect(result).to.be.deep.equal(notFound);
  });

  it('4- Testa se o ID inserido é válido', async () => {
    const result = await productService.getProductById('idInvalido');

    const invalidId = { "type": "WRONG_ID", "message": "Insert a valid ID" };
    expect(result).to.be.deep.equal(invalidId);
  });
})