const router = require('express').Router()

//importa o controller do admin
const AdminController = require('../controllers/AdminController')

//middleware pra verificar se o admin está logado (token válido)
const { estaLogado } = require('../middlewares/estaLogado')


//ROTAS PUBLICAS (pode acessar sem token)

//fazer login do admin, usa POST (recebe o email e senha no corpo da req)
router.post('/login', AdminController.login)

// criar admin, usa POST
router.post('/', AdminController.registrar)


//ROTAS PRIVADAS (só se passar um token valido)

//listar todos admins, usa GET
router.get('/', estaLogado, AdminController.listar)

//mostrar 1 admin especifico, usa GET
router.get('/:id', estaLogado, AdminController.mostrar)

//atualizar admin, usa PUT, recebe na url o ID do admin a ser atualizado
router.put('/:id', estaLogado, AdminController.atualizar)

//deletar admin, usa DELETE, recebe na url o ID do admin a ser atualizado
router.delete('/:id', estaLogado, AdminController.remover)


module.exports = router