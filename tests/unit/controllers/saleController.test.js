const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");
const {
  salesMock,
  missingProductIdMock,
  missingQuantityMock,
  lowQuantityMock,
  nonExistentProductMock,
  correctReponseMock,
} = require('../../mocks/sales.mock');


describe('Testa as vendas da camada Controller', () => {
  afterEach(function () {
    sinon.restore();
  })

  it('1- Testa se todos os produtos são mostrados na rota "/sales"', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(salesMock);

    sinon
      .stub(salesService, 'getSales')
      .resolves({ type: null, message: salesMock });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock);
  })

  it('2- Testa se uma venda é mostrada quando pesquisado seu Id', async () => {
    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(salesMock);

    sinon.stub(salesService, 'getSaleById')
      .resolves({ type: null, message: salesMock[2] });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock[2]);
  });

  it('3- Testa se o "productId" é obrigatório para cadastrar uma venda', async () => {
    const res = {};
    const req = { body: missingProductIdMock };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "createSale").resolves({ type: "INVALID_VALUE", message: '"productId" is required' });
    
    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ type: 'INVALID_VALUE', message: '"productId" is required' });
  });

  it('4- Testa se o "quantity" é obrigatório para cadastrar uma venda', async () => {
    const res = {};
    const req = { body: missingQuantityMock };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "createSale").resolves({ type: "INVALID_VALUE", message: '"quantity" is required' });

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ type: 'INVALID_VALUE', message: '"quantity" is required' });
  });

  it('5- Testa se o "quantity" deve ser maior que 0 para cadastrar uma venda', async () => {
    const res = {};
    const req = { body: lowQuantityMock };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "createSale").resolves({ type: "INVALID_VALUE", message: '"quantity" must be greater than or equal to 1' });

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ type: "INVALID_VALUE", message: '"quantity" must be greater than or equal to 1' });
  });

  it('6- Testa se o produto existe no banco dados para cadastrar uma venda', async () => {
    const res = {};
    const req = { body: nonExistentProductMock };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "createSale").resolves({ type: "INVALID_VALUE", message: 'Product not found' });

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ type: "INVALID_VALUE", message: 'Product not found' });
  });

  it('7- Testa se a venda é cadastrada corretamente no banco dados', async () => {
    const res = {};
    const req = { body: correctReponseMock.itemsSold };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "createSale").resolves(correctReponseMock);

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(correctReponseMock);
  });
});