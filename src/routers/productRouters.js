const express = require('express');
const productsController = require('../controllers');
// const productsModel = require('../models');

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', productsController.insertProduct);

module.exports = router;