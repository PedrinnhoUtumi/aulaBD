const db = require('../config/database')

exports.cadastrarProduto = async (novoProduto) => {
    const extensaoImagem = novoProduto.imagem.name.split('.').pop()
    const resposta = await db.query(
        'INSERT INTO produto (nome, valor, imagem) VALUES ($1, $2, $3) returning id_produto',
        [novoProduto.nome, novoProduto.valor, extensaoImagem]
    )
    console.log(resposta);
    return resposta.rows[0].id_produto
    
}