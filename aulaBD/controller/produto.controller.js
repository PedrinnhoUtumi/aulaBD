const produtoDAO = require('../model/produto.dao')

exports.cadastrarProduto =  async (novoProduto) => {
    return await produtoDAO.cadastrarProduto(novoProduto)
}