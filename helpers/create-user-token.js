const jwt  = require("jsonwebtoken")

const createUserToken = async(user, request, response)=>{
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, "1234", {expiresIn: 3600000} )
    response.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user.id
    })
    console.log(token)
}

module.exports = createUserToken