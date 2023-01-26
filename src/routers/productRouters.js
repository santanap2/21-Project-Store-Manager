const express = require('express');
const { productController } = require('../controllers');
const { validateName } = require('../services/validations/validationsInput');

const productRouter = express.Router();

productRouter.get('/products', productController.getAllProducts);
productRouter.get('/products/:id', productController.getProductById);
productRouter.post('/products', validateName, productController.insertProduct);
productRouter.put('/products/:id', validateName, productController.updateProduct);
// productRouter.delete('/products/:id', productController.deleteProduct);

module.exports = productRouter;