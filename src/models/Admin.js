const mongoose = require('mongoose')

//representação da tabela de admins no bancos
const adminSchema = new mongoose.Schema({ 
    nome: {
        type: String
    },
    email: {
        type: String
    },
    senha: {
        type: String
    }
}, {
    timestamps: true //isso aqui faz o mongoose registrar automaticamente a data de criação e de modificaçao desse objeto
})


const Admin = mongoose.model('Admin', adminSchema)

//exporta o model admin que vai ser chamado no controller
module.exports = Admin
