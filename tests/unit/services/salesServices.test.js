const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesMock, saleFindById } = require('../../mocks/sales.mock');

describe('Testa as vendas da camada Service', () => {
  afterEach(function () {
    sinon.restore();
  })

  it('1- Testa se todos as vendas são mostrados na rota "/sales"', async () => {
    sinon.stub(salesModel, 'getSales').resolves(salesMock);

    const result = await salesService.getSales();

    expect(result.message).to.be.deep.equal(salesMock);
  });

  it('2- Testa se o produto existe no banco dados ao pesquisar seu Id', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' });

    const result = await salesService.getSaleById(99);

    expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' });
  });

  // it('3- Testa se uma venda é mostrada quando pesquisado seu Id', async () => {
  //   sinon.stub(salesModel, 'getSaleById').resolves(salesMock[0]);

  //   const result = await salesService.getSaleById(1);

  //   expect(result).to.be.deep.equal(salesMock[2]);
  // });
});