const express = require('express');
const app = express();
const port = 8086;
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload')

const produtoController = require('./controller/produto.controller');
const usuarioController = require('./controller/usuario.controller');
const usuario = require('./entidades/usuario');
const produto = require('./entidades/produto')
const email = require('./config/email')
//Configuração do Handlebars (necessário a partir da rota #2)
//Informa ao express qual template engine será usado
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

//Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileupload())

app.get('/', function(rerq, res){
  res.end();
});

app.get('/listarProdutos', function (req, res) {
  const resultado = usuarioController.listarUsuarios();
  //resultado.then(resp => {res.send(resp)});
  resultado.then(resp => { res.render('listagemUsuarios', { resp }) });
  //console.log(resultado);
});

// app.get('/cadastrarUsuario', function (req, res) {
//   email("pedroutumi@gmail", 'Cadastro', 'Conta criada')
//   res.render('cadastroProduto');
// });

// app.post('/cadastrarUsuario', function (req, res) {
//   const novo_usuario = new usuario(req.body.nome, req.body.username, req.body.senha, req.body.email);

//   const resultado = usuarioController.criarUsuario(novo_usuario);
//   resultado.then(resp => {
//     if (resp.length > 0) {
//       res.render('cadastroUsuario', { usuario: novo_usuario, mensagem: resp });
//     }else{
//       // email(novo_usuario.email, 'Cadastro', 'Conta criada')
//       res.redirect('/listarUsuarios');
//     }
//   });

// });

app.post('/removerUsuario', function(req, res){
  const resultado =  usuarioController.removerUsuario(req.query.username);
  resultado.then(resp => {res.redirect('/listarUsuarios');});
});

app.get('/cadastrarProduto', function(req, res) {
  res.render('cadastroProduto')
})

app.post('/cadastrarProduto', function(req, res) {
  const novoProduto = new produto(req.body.nome, req.body.valor, req.files.imagem)
  const resultado = produtoController.cadastrarProduto(novoProduto)
  resultado.then(resp => {
    const extensaoImagem = req.files.imagem.name.split('.').pop()
    req.files.imagem.mv(__dirname + '/imagens/' + resp + '.' + extensaoImagem)
  })
})


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});