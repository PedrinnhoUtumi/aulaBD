const produtoDAO = require("../model/produto.dao");
const path = require('path');

// Função responsável por criar um novo produto
exports.cadastrarProduto = async function(novo_produto){
    const caminho = path.join(__dirname, '..', 'imagens/');
    const id_produto = await produtoDAO.cadastrarProduto(novo_produto);

    extensao_arquivo = novo_produto.imagem.name.split(".");

    novo_produto.imagem.mv(caminho+id_produto+'.'+extensao_arquivo.pop());

    return true;
}

exports.listarProdutos = async () => {
    return produtoDAO.listarProdutos()
}

exports.removerProduto = async (id_produto) => {
    return produtoDAO.removerProduto(id_produto)
}