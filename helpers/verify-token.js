// importação do jwt
const jwt = require("jsonwebtoken")
// importação do getToken helper para pegar o token que o usuario esta logado
const getToken = require("./get-token")


const checkToken = (request, response, next) =>{
// verifica se o cabeçalho authorization está presente na requisição caso contrario o acesso será negado
      if(!request.headers.authorization){
       return response.status(401).json({message: "Acesso Negado!"})
      }  
// obtem o token da requisição pelo getToken
    const token = getToken(request)
// se o token não estiver presente retornamos o erro de acesso negado
    if(!token){
       return response.status(401).json({message: "Acesso Negado!"})
    }

    try{
        // verificação do token extraindo o usuario e encapsulando na variavel verified
        const verified = jwt.verify(token, "1234")
        // adiciona ao objeto request como request.user
        request.user = verified
        next()
    }
        // se o token for invalido retorna o erro 
    catch(error){
        return response.status(400).json({message: "Token inválido"})
    }

}

module.exports = checkToken