const usuarioDAO = require("../model/usuario.dao");
const usuarioRN = require("../model/usuario.rn");

// Função responsável por consultar todos os usuários
exports.listarUsuarios = async function(){
    return usuarioDAO.listarUsuarios();
}

// Função responsável por criar um novo usuário
exports.criarUsuario = async function(novo_usuario){
    const erros = [];

    const user = await usuarioDAO.procurarUsuarioPeloUsername(novo_usuario.username);

    if(user.length != 0){
        erros.push("Erro: username já cadastrado!");
    }

    if(!usuarioRN.validarUsername(novo_usuario.username)){        
        erros.push("Erro: username deve ter entre 5 e 10 caracteres!");
    }

    if(!usuarioRN.validarSenha(novo_usuario.senha)){
        erros.push("Erro: a senha deve pelo menos 8 caracteres, contendo letras maiúsculas, minúsculas, dígitos e caracteres especiais ($*&@#)!");
    }
    
    if(erros.length > 0){
        return erros;
    }

    await usuarioDAO.criarUsuario(novo_usuario);
    return [];
}

// Função responsável por remover um usuário pelo 'username'
exports.removerUsuario = async function(username){
    return await usuarioDAO.removerUsuarioPeloUsername(username);
}