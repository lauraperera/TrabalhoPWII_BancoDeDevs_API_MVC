const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

//faz conexao c banco
const {iniciaConexao} = require("./db/conexao");

//importa as rotas
const adminRoutes = require('./routes/adminRoutes')
const devRoutes = require('./routes/devRoutes')

//qdo usar url/admin mostrar o conteúdo de adminRoutes
app.use('/admin', adminRoutes)

//qdo usar url/dev mostrar o conteúdo de devRoutes
app.use('/dev', devRoutes)


//req /db/conexao.js e faz a conexão antes de iniciar o server http
iniciaConexao()
  .then(() => {
    //conseguiu conectar no banco, incia o server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  })
  .catch(erro => {
    //nao conseguiu conectar no banco, fecha o app
    console.error("Erro ao connectar no banco\n", erro)
  })
