const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models')
const {
  salesMock,
} = require('../../mocks/sales.mock');

describe("Testes as vendas da camada Models", function () {
  afterEach(function () {
    sinon.restore();
  });

  it('1- Testa se todas as vendas são mostradss na rota "/sales"', async () => {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const result = await salesModel.getSales();

    expect(result).to.be.deep.equal(salesMock);
  });

  it('2- Testa se uma venda é mostrada quando pesquisado seu Id', async () => {
    sinon.stub(connection, 'execute').resolves([salesMock[0]]);

    const result = await salesModel.getSaleById(1);

    expect(result).to.be.deep.equal(salesMock[0]);
  });
});