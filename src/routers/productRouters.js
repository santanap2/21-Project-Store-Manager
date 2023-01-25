const express = require('express');
const { productController } = require('../controllers');
const { validateName } = require('../services/validations/validationsInput');

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', validateName, productController.insertProduct);

module.exports = router;