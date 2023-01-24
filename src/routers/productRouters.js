const express = require('express');
const productsController = require('../controllers');
const { validateName } = require('../services/validations/validationsInput');

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', validateName, productsController.insertProduct);

module.exports = router;