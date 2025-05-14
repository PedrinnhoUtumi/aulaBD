
// Função responsável por consultar todos os usuários
exports.validarUsername = function(username){
    if((username.length >= 5) && (username.length <= 10)){
        return true;
    }
    return false;
}

exports.validarSenha = function(senha){
    // /^
    //     (?=.*\d)              // deve conter ao menos um dígito
    //     (?=.*[a-z])           // deve conter ao menos uma letra minúscula
    //     (?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
    //     (?=.*[$*&@#])         // deve conter ao menos um caractere especial
    //     [0-9a-zA-Z$*&@#]{8,}  // deve conter ao menos 8 dos caracteres mencionados
    // $/
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;

    return regex.test(senha);
}