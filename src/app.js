const express = require('express');

const app = express();
const router = require('./routers');

// const productsModel = require('./models');

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.post('/products', async (req, res) => {
//   const name = req.body;
//   const test = await productsModel.insertProduct(name);
//   console.log(test);
//   return res.status(201).json(test);
// });

app.use(router.productRouters);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;