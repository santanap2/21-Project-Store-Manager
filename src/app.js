// iniciando projeto
const express = require('express');

const app = express();

const productModels = require('./models');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('FUNCIONANDO');
}); 
 
app.get('/products', productModels.getAllProducts); 

app.get('/products/:id', (req, res) => productModels.getProductById(req, res));

// app.get('/products/:id', productModels.getProductById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;