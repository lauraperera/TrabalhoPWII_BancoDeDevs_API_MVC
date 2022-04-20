const mongoose = require('mongoose')

//representação da tabela de devs no bancos
const devSchema = new mongoose.Schema({
    nome: {
        type: String
    },
    email: {
        type: String
    },
    area: {
        type: String
    },
    tecnologias: {
        type: String
    },
    senioridade: {
        type: String
    },
    experiencia: {
        type: String
    }
}, {
    timestamps: true // isso aqui faz o mongoose registrar automaticamente a data de criação e de modificaçao desse objeto
})


const Dev = mongoose.model('Dev', devSchema)

//exporta o model dev que vai ser chamado no controller
module.exports = Dev
