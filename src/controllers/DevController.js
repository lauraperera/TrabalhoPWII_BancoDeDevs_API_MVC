//importa função q valida email (retorna true se for válido e false se for inválido)
const { emailValido } = require('../helpers/emailValido')

//importa o model dev
const Dev = require('../models/Dev')

class DevController {

    //lista todos os dev
    async listar(req, res) {
        const devs = await Dev.find({})
        return res.status(200)
            .json({
                mensagem: 'lista de devs',
                dados: devs
            })
    }

    //mostra 1 dev pelo id
    async mostrar(req, res) {
        const devId = req.params.id

        Dev.findById(devId)
            .then(dev => {
                //nao encontrou, retorna erro
                if (!dev) {
                    return res.status(404) //status 404 = not found (não encontrou)
                        .json({
                            mensagem: 'dev não encontrado'
                        })
                }

                //encontrou o dev, retorna os dados
                return res.status(200) //status 200 = OK 
                    .json({
                        mensagem: 'dev encontrado',
                        dados: dev
                    })
            })
            .catch(erro => {
                return res.status(500) //status 500 = internal server error (deu ruim no banco)
                    .json({
                        mensagem: 'erro interno ' + erro.message,
                    })
            })
    }

    //cria 1 dev
    async registrar(req, res) {
        const { nome, email, area, tecnologias, senioridade, experiencia } = req.body

        // validação
        const erros = {}

        if (!nome || nome.length < 3) {
            erros['nome'] = 'Nome precisa ter no minimo 3 letras'
        }
        if (!email || !emailValido(email)) {
            erros['email'] = 'Email não está no formato correto'
        }
        if (!area) { //verifica se tem algo no body
            erros['area'] = 'Area é obrigatório'
        }
        if (!tecnologias) {
            erros['tecnologias'] = 'Tecnologias é obrigatório'
        }
        if (!senioridade || !['Junior', 'Pleno', 'Senior'].includes(senioridade)) { // obriga usuario digitar uma dessas 3 opçoes
            erros['senioridade'] = 'Senioridade deve ser: Junior, Pleno ou Senior'
        }
        if (!experiencia) {
            erros['experiencia'] = 'Experiencia é obrigatório'
        }

        // conta quantos erros tiveram, se tiver mais que 0 retorna o erro
        if (Object.keys(erros).length > 0) {
            return res
                .status(422) //status 422 = unprocessable entity (não conseguiu processar as instruções)
                .json({
                    mensagem: 'Erros encontrados',
                    erros
                })
        }


        //se não encontrou erros, então tenta cadastrar
        Dev.create({
            nome: nome,
            email: email,
            area: area,
            tecnologias: tecnologias,
            senioridade: senioridade,
            experiencia: experiencia
        })
            .then(dev => {
                //deu bom, retorna os dados do dev
                return res.status(201) //status 201 = created (entidade criada c sucesso)
                    .json({
                        mensagem: 'dev criado com sucesso',
                        dados: dev
                    })
            })
            .catch(erro => {
                //deu ruim, retorna erro 
                return res.status(500) //status 500 = internal server error (deu ruim no banco)
                    .json({
                        mensagem: 'Erro ao registrar',
                        erro
                    })
            })
    }

    //atualiza dev
    async atualizar(req, res) {
        const devId = req.params.id
        const { nome, email, area, tecnologias, senioridade, experiencia } = req.body

        //tenta achar o dev
        Dev.findById(devId)
            .then(dev => {
                // nao encontrou, retorna erro
                if (!dev) {
                    return res.status(404)
                        .json({
                            mensagem: 'dev não encontrado'
                        })
                }

                // achou o dev
                // validação dos dados que o usuario entrou
                const erros = {}

                if (!nome || nome.length < 3) {
                    erros['nome'] = 'Nome precisa ter no minimo 3 letras'
                }
                if (!email || !emailValido(email)) {
                    erros['email'] = 'Email não está no formato correto'
                }
                if (!area) { //verifica se tem alguma coisa no body
                    erros['area'] = 'Area é obrigatório'
                }
                if (!tecnologias) {
                    erros['tecnologias'] = 'Tecnologias é obrigatório'
                }
                if (!senioridade || !['Junior', 'Pleno', 'Senior'].includes(senioridade)) { // obriga usuario digitar uma dessas 3 opçoes
                    erros['senioridade'] = 'Senioridade deve ser: Junior, Pleno ou Senior'
                }
                if (!experiencia) {
                    erros['experiencia'] = 'Experiencia é obrigatório'
                }

                // conta quantos erros tiveram, se tiver mais que 0 então tiveram erros, entao retorna o erro
                if (Object.keys(erros).length > 0) {
                    return res
                        .status(422) //status 422 = unprocessable entity (não conseguiu processar as instruções)
                        .json({
                            mensagem: 'Erros encontrados',
                            erros
                        })
                }


                // nao encontrou erros, então tenta atualizar
                dev.nome = nome
                dev.email = email
                dev.area = area
                dev.tecnologias = tecnologias
                dev.senioridade = senioridade
                dev.experiencia = experiencia

                dev.save()
                    .then(() => {
                        return res.status(200) //status 200 = OK
                            .json({
                                mensagem: 'dev atualizado com sucesso',
                                dados: dev
                            })
                    })


            })
            .catch(erro => {
                return res.status(500) //status 500 = internal server error (deu ruim no banco)
                    .json({
                        mensagem: 'erro interno ' + erro.message,
                    })
            })

    }

    //deleta dev
    async remover(req, res) {
        const devId = req.params.id

        Dev.findByIdAndDelete(devId)
            .then((dev) => {
                // nao encontrou o dev
                if (!dev) {
                    return res.status(404) //status 4040 = not found (não encontrou)
                        .json({
                            mensagem: 'dev não encontrado'
                        })
                }

                //conseguiu deletar, sucesso
                return res.status(200) //status 200 = OK 
                    .json({
                        mensagem: 'dev deletado com sucesso'
                    })
            })
            .catch(erro => {
                return res.status(500) //status 500 = internal server error (deu ruim no banco)
                    .json({
                        mensagem: 'erro interno ' + erro.message
                    })
            })

    }
}

//exporta o controller do dev
module.exports = new DevController()