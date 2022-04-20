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

## API

- Cliente (client) - faz um pedido;
- Garçom (API) - anota o pedido em um bloquinho de notas;
- Cozinha (server) - recebe o pedido através do bloquinho do garçon.

API (application programming interface) é basicamente um conjunto de rotinas e padrões estabelecidos por uma aplicação, para que **outras** aplicações possam utilizar essas funconalidades.

- Responsável por establecer comunicação entre diferentes serviços;
- Intermediador para troca de informações.

## REST

REST (representational state transfer - transferência de estado representativo) é a transferência de dados de uma maneira representativa/didática (json ou xml).

- A transferência de dados geralmente é feita usando **protocolo http** (bloquinho de notas do garçom).
- Determina algumas obrigaçoes na transferência de dados;

Existem 6 necessidades (constraints) para ser **RESTful**:
- _Client-server_: cleinte e servidor precisam estar separados, dessa forma poderemos ter uma **portabilidade** do nosso sistema (usando React pra web e RN pra mobile, por exemplo);
- _Stateless_: Cada requisição que o cliente faz para o servidor, deverá conter todas as informações necessárias pro servidor entender e responder **(response)** a requisição **(request)**, ele NÃO pode armazenar essas informações - nesse caso ele teria um ESTADO. _Exemplo: A sessão do usuário deverá ser enviada em todas as req, para saber se aquele usuário está autenticado e apto a usar os serviços, e o servidor não pode lembrar que o cliente foi atutenticado na req anterior_;
- _Cacheable_: As respostas para uma requisição deverão ser explicitas ao dizer se aquela req pode ou não ser cacheada pelo cliente;
- _Layered System_: Nesse exemplo o _graph.facebook_ é uma API e o _youtube_ é um endpoint (caminho onde quer chegar) https://graph.facebook.com/youtube. O cliente acessa um endpoint, sem precisar saber da compexidade, de quais passos estão sendo necessários para o servidor responder a req, ou quais outras **camadas** o servidor estará lidando para que a req seja atendida; 
- _Code on demand (optional)_: O servidor manda pro cliente um **script** que pode ser executado no front. Dá a possibilidade da nossa aplicação pegar códigos (JS por ex.) e executar no cliente;
- _Uniform Interface_: Manter o mesmo padrão no desenvolvimento de toda a aplicação.

Referências de estudo [Rocketseat](https://www.youtube.com/watch?v=ghTrp1x_1As)