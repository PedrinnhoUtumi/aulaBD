const produtoDAO = require("../model/produto.dao");
const path = require('path');
const fileSystem = require("fs")

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

exports.removerProduto = async (id_produto, imagem) => {
    produtoDAO.removerProduto(id_produto)
    fileSystem.unlink(path.join(__dirname, '..', '/imagens/' + id_produto + '.' + imagem), erro => {
        if (erro) {
            console.log(`Falha ao remover a imagem: ${erro}`);
        } else {
            console.log('Removida com sucesso'); 
        }
    })
    return true
}

exports.consultarProduto = async (id_produto) => {
    return produtoDAO.consultarProduto(id_produto)
}