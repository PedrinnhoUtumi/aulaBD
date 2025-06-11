const db = require("../config/database");


exports.cadastrarVenda = async function(nova_venda){

    const resposta = await db.query(
        'INSERT INTO venda (produto, usuario, valor) VALUES ($1, $2, $3) returning *',
        [nova_venda.produto, nova_venda.usuario, nova_venda.valor]
    );
}
