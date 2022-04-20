//importa o bcrypt p fazer o hash da senha na hora do cadastro do admin
const bcrypt = require('bcrypt')

//importa o jsonwebtoken p gerar o token de acesso apos o login
const jwt = require('jsonwebtoken')

//importa função q valida email (retorna true se for válido e false se for inválido)
const {emailValido} = require('../helpers/emailValido')

//importa o model admin
const Admin = require('../models/Admin')

class AdminController {
    
    //lista todos os admin
    async listar(req, res) {
        const admins = await Admin.find({}).select('-senha') //o select "-senha" é p não retornar a coluna senha

        return res.status(200) //status 200 = OK 
            .json({
                mensagem: 'lista de admins',
                dados: admins
            })
    }

    //mostra 1 admin pelo id
    async mostrar(req, res) {
        const adminId = req.params.id

        Admin.findById(adminId).select('-senha')
            .then(admin => {
                //nao encontrou, retorna erro
                if (!admin) {
                    return res.status(404) //status 404 = not found (não encontrou)
                        .json({
                            mensagem: 'admin não encontrado'
                        })
                }

                //encontrou, retorna os dados (exceto senha)
                return res.status(200) //status 200 = OK 
                    .json({
                        mensagem: 'admin encontrado',
                        dados: admin
                    })
            })
            .catch(erro => {
                return res.status(500) //status 500 = internal server error (deu ruim no banco)
                    .json({
                        mensagem: 'erro interno ' + erro.message,
                    })
            })
    }

    //cria 1 admin
    async registrar(req, res) {
        const { nome, email, senha } = req.body

        //validação
        const erros = {}

        if (!nome || nome.length < 3) {
            erros['nome'] = 'Nome precisa ter no minimo 3 letras'
        }
        if (!email || !emailValido(email)) {
            erros['email'] = 'Email não está no formato correto'
        }
        if (!senha || senha.length < 6) {
            erros['senha'] = 'Senha precisa ter no minimo 6 caracteres'
        }

        //conta quantos erros tiveram, se tiver mais que 0 retorna o erro
        if (Object.keys(erros).length > 0) {
            return res
                .status(422) //status 422 = unprocessable entity (não conseguiu processar as instruções)
                .json({
                    mensagem: 'Erros encontrados',
                    erros
                })
        }

        const existeAdmin = await Admin.findOne({ email: email })

        //se ja existe um admin com esse email, retorna um erro
        if (existeAdmin) {
            return res.status(400) //status 400 = bad request (servidor não processa a req)
                .json({
                    mensagem: 'este email já está em uso'
                })
        }


        //se nao encontrou erros, então tenta cadastrar
        //salt acrescenta aleatoriamente seq de caracteres na senha
        const salt = bcrypt.genSaltSync(10)
        const senhaHasheada = bcrypt.hashSync(senha, salt)

        Admin.create({
            nome: nome,
            email: email,
            senha: senhaHasheada
        })
            .then(admin => {
                //oculta a senha pra nao ser exibida
                admin.senha = undefined

                //deu bom, retorna os dados admin
                return res.status(201) //status 201 = created (entidade criada c sucesso)
                    .json({
                        mensagem: 'admin criado com sucesso',
                        dados: admin
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

    //login admin (retorna token se o login tiver certo)
    async login(req, res) {
        const { email, senha } = req.body

        // validação do formulario
        const erros = {}

        if (!email || !emailValido(email)) {
            erros['email'] = 'Email não está no formato correto'
        }
        if (!senha || senha.length < 6) {
            erros['senha'] = 'Senha precisa ter no minimo 6 caracteres'
        }

        //conta quantos erros tiveram, se tiver mais que 0 retorna o erro
        if (Object.keys(erros).length > 0) {
            return res
                .status(422) //status 422 = unprocessable entity (não conseguiu processar as instruções)
                .json({
                    mensagem: 'Erros encontrados',
                    erros
                })
        }

        // tenta achar o admin pelo email
        const admin = await Admin.findOne({ email: email })

        // se não encontrar o admin, retorna um erro
        if (!admin) {
            return res.status(404) //status 404 = not found (não encontrou)
                .json({
                    mensagem: 'este admin não existe'
                })
        }

        
        //achou o admin
        //testa a senha usando o bcrypt, se não for igual retorna um erro
        if (!bcrypt.compareSync(senha, admin.senha)) {
            return res.status(400) //status 400 = bad request (servidor não processa a req)
                .json({
                    mensagem: 'senha incorreta'
                })
        }

        //senha correta, então gera um token de acesso e retorna
        const token = jwt.sign({
            adminId: admin.id
        }, 'chave-secreta')

        return res.status(200) //status 200 = OK
            .json({
                mensagem: 'login efetuado com sucesso',
                token: token,
                admin: {
                    _id: admin.id,
                    nome: admin.nome
                }
            })
    }

    //atualiza admin
    async atualizar(req, res) {
        const adminId = req.params.id
        const { nome, email } = req.body

        //tenta achar o admin
        Admin.findById(adminId)
            .then(admin => {
                //nao encontrou, retorna erro
                if (!admin) {
                    return res.status(404) //status 404 = not found (não encontrou)
                        .json({
                            mensagem: 'admin não encontrado'
                        })
                }

                // achou o admin
                // validação dos dados que o usuario entrou
                const erros = {}

                if (!nome || nome.length < 3) {
                    erros['nome'] = 'Nome precisa ter no minimo 3 letras'
                }
                if (!email || !emailValido(email)) {
                    erros['email'] = 'Email não está no formato correto'
                }

                //conta quantos erros tiveram, se tiver mais que 0 retorna o erro
                if (Object.keys(erros).length > 0) {
                    return res
                        .status(422) //status 422 = unprocessable entity (não conseguiu processar as instruções)
                        .json({
                            mensagem: 'Erros encontrados',
                            erros
                        })
                }


                // nao encontrou erros, então tenta atualizar
                admin.nome = nome
                admin.email = email

                admin.save()
                    .then(() => {
                        // oculta a senha antes de retornar
                        admin.senha = undefined

                        return res.status(200) //status 200 = OK
                            .json({
                                mensagem: 'admin atualizado com sucesso',
                                dados: admin
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

    //deleta admin
    async remover(req, res) {
        const adminId = req.params.id

        Admin.findByIdAndDelete(adminId)
            .then((admin) => {
                //nao encontrou o admin
                if (!admin) {
                    return res.status(404) //status 4040 = not found (não encontrou)
                        .json({
                            mensagem: 'admin não encontrado'
                        })
                }

                //conseguiu deletar, sucesso
                return res.status(200) //status 200 = OK 
                    .json({
                        mensagem: 'admin deletado com sucesso'
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

//exporta o controller do admin
module.exports = new AdminController()