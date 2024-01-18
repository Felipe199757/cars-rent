const User = require("../models/User")
function validarCpf(cpf) {
    
  // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
  
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }
  
    // Verifica se todos os dígitos são iguais (caso contrário, o CPF é inválido)
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }
  
    // Aplica o algoritmo de validação do CPF
    let soma = 0;
    let resto;
  
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
  
    resto = (soma * 10) % 11;
  
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
  
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
  
    soma = 0;
  
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
  
    resto = (soma * 10) % 11;
  
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
  
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
  
    return true;
  }
    
  module.exports = validarCpf
  