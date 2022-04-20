# Sobre o projeto
Este projeto foi desenvolvido como forma de avaliação para a disciplina de **Programação Web II** do curso Tecnologia em Análise e Desenvolvimento de Sistemas - IFSul, Campus Bagé. 

A proposta solicitava o desenvolvimento de um projeto abordando técnicas básicas e aplicação de _framework_ Web com ORM. 

Conteúdos **esssenciais** para o projeto: 
- Servidor _http_ e seus verbos (GET, POST, PUT, DELETE);
- Grupos de rotas;
- Banco de dados (relacional ou não relacional);
- Autenticação (_Token_);
- Middleware;
- Padrão MVC;
- Criptografia (_Hash_).

# Como rodar?
1. Abra o projeto no _VSCode_;

2. Digite **Ctrl + Shift + `** para abrir um novo terminal;

3. Com o terminal aberto rode um dos comandos abaixo para instalar automaticamente as dependências do projeto:
```
$ yarn install //para gerenciador de pacotes yarn
```
```
$ npm install //para gerenciador de pacotes npm
```

4. Após instaladas as dependências rode um dos comandos abaixo para iniciar a aplicação:
```
$ yarn start //para gerenciador de pacotes yarn
```
```
$ npm start //para gerenciador de pacotes npm
```

5. Após estar com o servidor rodando, basta testar as rotas da API utilizando _Insomnia_ ou _Postman_

# Instalações utilizadas:

**Nodemon** (biblioteca pra restartar a aplicação a cada alteração)
```
$ yarn add nodemon
```
```
$ npm i nodemon
```
**Express** (framework pra trabalhar com servidor http)
```
$ yarn add express
```
```
$ npm i express --save
```
**Mongoose** (biblioteca pra fazer conexão com banco mongodb)
```
$ yarn add mongoose
```
```
$ npm i mongoose
```

**Bcrypt** (biblioteca pra fazer _hash_ de senha)
```
$ yarn add bcrypt
```
```
$ npm i bcrypt
```

**Jsonwebtoken** (padrão de autenticação/geração de _token_)

```
$ yarn add jsonwebtoken
```
```
$ npm i jsonwebtoken
```

# Informações complementares
## Status das respostas
- 100-199: respostas de informação
- 200-299: respostas de sucesso
- 300-399: redirecionamentos
- 400-499: erros do cliente
- 500-599: erros do servidor 

##  Verbos HTTP
- GET
    - **Sem passagem de parâmetro**: retorna uma lista completa com todos os dados;
    - **Com passagem de parâmetro**: retorna apenas os dados referentes ao parâmetro especificado;
- POST
    - Normalmente é utilizado **sem passagem de parâmetro** para inserir algum dado;
- PUT: 
    - Normalmente é utilizado **com passagem de parâmetro** para editar algum dado no recurso referida;
- DELETE: 
    - Utilizado para remover um recurso (**utilizar com passagem de parâmetro**) 
