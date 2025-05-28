const db = require("../config/database");

// Função responsável por criar um novo produto
exports.cadastrarProduto = async function(novo_produto){

    const extensao_arquivo = novo_produto.imagem.name.split(".").pop();

    const resposta = await db.query(
        'INSERT INTO produto (nome, valor, imagem) VALUES ($1, $2, $3) returning id_produto',
        [novo_produto.nome, novo_produto.valor, extensao_arquivo]
    );
    //console.log(resposta)
    return resposta.rows[0].id_produto;
}

exports.listarProdutos = async function(){
    const {rows} = await db.query("SELECT * FROM produto");
    return rows;
}

exports.removerProduto = async (id_produto) => {
    const resposta = await db.query(
        `DELETE FROM produto WHERE id_produto = '${id_produto}'`
    )
    return true
}

exports.consultarProduto = async (id_produto) => {
    const {rows} = await db.query(
        `SELECT * FROM produto WHERE id_produto = ${id_produto}`
    )
    console.log(id_produto);
    console.log(rows)
    
    return rows[0]
}