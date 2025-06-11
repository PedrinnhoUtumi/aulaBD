const vendaDAO = require("../model/venda.dao")

exports.cadastrarVenda = async function(nova_venda){
    return vendaDAO.cadastrarVenda(nova_venda)
}

