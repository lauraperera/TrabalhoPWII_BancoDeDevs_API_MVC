const mongoose = require('mongoose')

exports.iniciaConexao = async () => {
    return await mongoose.connect(`mongodb://localhost:27017/bancodedevs`)
}