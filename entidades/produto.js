class Produto {
    constructor(nome, valor, imagem, id_produto=null) {
        this.nome = nome;
        this.valor = valor;
        this.imagem = imagem;
        this.id_produto = id_produto;
    }
}

module.exports = Produto;