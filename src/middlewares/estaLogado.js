const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

/**
 * MIDDLEWARE que só deixa passar se o usuario passar um token valido
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
exports.estaLogado = (req, res, next) => {
    // remove o "Bearer " e pega só o token da requisição
    const token = (req.headers.authorization || '').replace(/^Bearer /i, '')

    try {
        const { adminId } = jwt.verify(token, 'chave-secreta')

        // busca o admin do token
        Admin.findById(adminId).then(admin => {
            // admin não existe mais
            if (!admin) {
                return res.status(401)
                    .json({
                        mensagem: 'esta conta não está mais disponivel'
                    })
            }
            
            // token valido e o admin existe, segue em frente
            next()
        })
    } catch (e) {
        // token invalido, retorna erro
        return res.status(401) // status 401 significa que o usuario nao esta autenticado
            .json({
                mensagem: 'token inválido. você precisa estar autenticado para executar esta ação'
            })
    }
}