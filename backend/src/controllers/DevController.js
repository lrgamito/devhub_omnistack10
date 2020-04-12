//Importa o modulo axios
const axios = require('axios');
//Importa Dev
const Dev = require('../models/Dev');
//Importa a function utils de tratamento de array
const parseSStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response){
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    //Busca apenas o param enviado no body da API
    const { github_username, techs, latitude, longitude } = request.body;

    //Verificar se o Dev já existe
    let dev = await Dev.findOne({ github_username });
    //Se não existir cria
    if (!dev) {
        // faz a chamada para a api, uso da craze para string para poder colocar variaveis nela,
      //await funciona junto com o async acima, para que o JS aguarde essa api para seguir
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      // essa chave busca somente aquela info dentro da response, name = login diz que o padrão para buscar
      // é o name mas se não tiver, busca o login
      const { name = login, avatar_url, bio } = apiResponse.data;

      //Separa a String techs em um Array, quando houver virgula, depois percorre o array e trima (tira espaço)
      const techsArray = parseSStringAsArray(techs);

      //Criar um objeto para rececber e tratar a latitude e longitude
      const location = {
          type: 'Point', 
          coordinates: [longitude, latitude],
      };

      //cadastra o Dev
      dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location
      })
    };

    //Retorna os dados do Dev cadastrado
    return response.json({dev});
  }
  // todo
  //async update
  //async destroy
};