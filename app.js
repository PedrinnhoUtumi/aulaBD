const express = require('express');
const app = express();
const port = 8086;
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

const vendaController = require("./controller/venda.controller");
const venda = require("./entidades/venda");
//Adicionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

const usuarioController = require('./controller/usuario.controller');
const produtoController = require('./controller/produto.controller');
const usuario = require('./entidades/usuario');
const produto = require('./entidades/produto');
const email = require('./config/email');

//Configuração do Handlebars (necessário a partir da rota #2)
//Informa ao express qual template engine será usado
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

//Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuração express-fileupload
app.use(fileupload());

//Necessário apenas quando for listas
app.use('/imagens', express.static('./imagens'));

app.get('/', function(req, res){
  
});

app.get('/listarUsuarios', function (req, res) {
  const resultado = usuarioController.listarUsuarios();
  resultado.then(resp => { res.render('listagemUsuarios', { resp }) });
});

app.get('/cadastrarUsuario', function (req, res) {
  res.render('cadastroUsuario');
});

app.post('/cadastrarUsuario', function (req, res) {
  const novo_usuario = new usuario(req.body.nome, req.body.username, req.body.senha, req.body.email);

  const resultado = usuarioController.criarUsuario(novo_usuario);
  resultado.then(resp => {
    if (resp.length > 0) {
      res.render('cadastroUsuario', { usuario: novo_usuario, mensagem: resp });
    }else{
      email(novo_usuario.email, 'Cadastro no Sistema', 'Seu cadastro foi realizado!');
      res.redirect('/listarUsuarios');
    }
  });

});

app.post('/removerUsuario', function(req, res){
  const resultado =  usuarioController.removerUsuario(req.query.username);
  resultado.then(resp => {res.redirect('/listarUsuarios');});
});


app.get('/cadastrarProduto', function (req, res) {
  const resultado = produtoController.listarProdutos();
  resultado.then(produtos => {
    res.render('cadastroProduto', {produtos});
  })
});

app.post('/cadastrarProduto', function(req, res){
  
  const novo_produto = new produto(req.body.nome, req.body.valor, req.files.imagem);

  const resultado = produtoController.cadastrarProduto(novo_produto);
  
  res.redirect('/cadastrarProduto');
});

app.get('/removerProduto/:id&:imagem', (req, res) => {
  const resposta = produtoController.removerProduto(req.params.id, req.params.imagem)
  resposta.then(resp => {
    res.redirect('/cadastrarProduto')
  })
  
})

app.get('/alterarProduto/:id', (req, res) => {
  const resposta = produtoController.consultarProduto(req.params.id)
  resposta.then(resp => {
    if (resp) {
      res.render('edicaoProduto', {produto: resp})
    } else {
      res.redirect('/cadastrarProduto')
    }
  })
  
})

app.post('/alterarProduto', (req, res) => {
  let edicao_produto;
  
  try {
    edicao_produto = new produto(req.body.nome, req.body.valor, req.files.imagem, req.body.id_produto)
  } catch(erro) {
    edicao_produto = new produto(req.body.nome, req.body.valor, null, req.body.id_produto)
  }

  const resultado = produtoController.atualizarProduto(edicao_produto, req.body.imagemAntiga)

  resultado.then(resp => {
    res.redirect('/cadastrarProduto')
  })
  
})

app.get("/comprarProduto/:id", async function(req, res) {
  console.log(req.params.id)
  const [produto, lista_usuarios] = await Promise.all([
    produtoController.consultarProduto(req.params.id),
    usuarioController.listarUsuarios()
  ])
  console.log(lista_usuarios);
  
  res.render("compraProduto", {produto:produto, usuarios:lista_usuarios})
})

app.post("/comprarProduto", function(req, res){
  const nova_venda = new venda(req.body.id_produto, req.body.id_usuario, req.body.valor);
  const resultado = vendaController.cadastrarVenda(nova_venda)

  resultado.then(resp => {
    res.redirect('/cadastrarProduto')
  })
})


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});