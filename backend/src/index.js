//Importa a lib express, de rotas e metodos http
const express = require('express');
//Importa a lib de banco mongodb
const mongoose = require('mongoose');
//Importa cors - para rodar de fontes diferentes o app
const cors = require('cors');
//Importa nosso arquivo de routes separado
const routes = require('./routes');

const app = express();

//Conecta usando a string de conexão do mongodb atlas
mongoose.connect('mongodb+srv://lgamito:lgamito@cluster0-xoz8w.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());

//Dizer para o express que ele deve entender em Json
app.use(express.json());

//Metodos HTTP: get, post, put, delete

//Tipos de Parâmetros: 
//Query Params: request.query (Filtros, oredenação, paginação, etc)
//Route Params: request.params (Identificat um recurso na inserção ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

//Usar o MongoDB - Não relacional, para apps que não tem muitos dados relacionados.

//Dizer para o app usar o routes, esse comando deve sempre estar depois do express.json()
app.use(routes);


app.listen(3333);

