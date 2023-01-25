const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const productsMock = require('../../mocks/products.mock');

chai.use(sinonChai);

describe('Testa os produtos da camada Controller', () => {
  afterEach(function () {
    sinon.restore();
  })

  it('1- Testa se todos os produtos são mostrados na rota "/products"', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(productsMock);

    sinon
      .stub(productService, 'getAllProducts')
      .resolves({ type: null, message: productsMock});

    await productController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock);
  });

  it('2- Testa se um produto é mostrado quando pesquisado seu Id', async () => {
    const req = { params: { id: 3 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(productsMock);

    sinon.stub(productService, 'getProductById')
      .resolves({ type: null, message: productsMock[2] });

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(productsMock[2]);
  });

  it('3- Testa se a mensagem "Product not found" é exibida quando o produto não existe', async () => {
    const req = { params: { id: 999 } };
    const res = {};
    const notFound = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(notFound);

    sinon.stub(productService, 'getProductById')
      .resolves(notFound);

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFound);
  });
});
