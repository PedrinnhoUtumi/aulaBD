const db = require("../config/database");
const md5 = require('md5');

// Função responsável por listar todos os usuários
exports.listarUsuarios = async function(){
    const {rows} = await db.query("SELECT * FROM usuario WHERE isativo = true");
    return rows;
}

// Função responsável por criar um novo usuário
exports.criarUsuario = async function(novo_usuario){
    const resposta = await db.query(
        'INSERT INTO usuario (nome, username, senha, email, isativo) VALUES ($1, $2, $3, $4, $5)',
        [novo_usuario.nome, novo_usuario.username, md5(novo_usuario.senha), novo_usuario.email, true]
    );
    
    return "Usuário cadastrado com sucesso!";
}

//Função responsável por buscar um usuário a partir de seu 'username'
exports.procurarUsuarioPeloUsername = async function(username){
    const {rows} = await db.query(
        `SELECT * FROM usuario WHERE username = '${username}'`
    );
    
    return rows;
}

//Função responsável por remover um usuário a partir de seu 'username'
exports.removerUsuarioPeloUsername = async function(username){
    const {rows} = await db.query(
        `UPDATE usuario SET isativo = false WHERE username = '${username}'`
    );
    
    return rows;
}
