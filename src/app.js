const express = require('express');

const app = express();
const router = require('./routers');

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
 
app.use(router.productRouters);
app.use(router.salesRouters);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;