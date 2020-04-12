const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

//Definir como a entidade Dev deve ser, qual o formato dela
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

//Exporta o module, nome e o Schema criado acima
module.exports = mongoose.model('Dev', DevSchema);