const router = require('express').Router()

//importa o controller do dev
const DevController = require('../controllers/DevController')

// rotas do dev

// listar devs, usa GET
router.get('/', DevController.listar)

// mostrar 1 dev especifico, usa GET
router.get('/:id', DevController.mostrar)

// criar dev, usa POST
router.post('/', DevController.registrar)

// atualizar dev, usa PUT (toda entidade), recebe na url o ID do dev a ser atualizado
router.put('/:id', DevController.atualizar)

// deletar dev, usa DELETE, recebe na url o ID do dev a ser atualizado
router.delete('/:id', DevController.remover)


module.exports = router