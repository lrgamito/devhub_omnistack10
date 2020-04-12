//importa o modulo
const { Router } = require('express');

//Importar o DevController
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

//instancia a função Router
const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

//Exporta o modulo para que toda a aplicação tenha conhecimento dela
module.exports = routes;