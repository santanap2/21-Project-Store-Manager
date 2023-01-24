// iniciando projeto
const express = require('express');

const app = express();

// const productModels = require('./models');

const productRouter = require('./routers/productRouters');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productRouter);

// app.get('/products', productModels.getAllProducts); 

// app.get('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   const result = await productModels.getProductById(id);
//   return res.status(200).json(result);
// });

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;