const jwt = require("jsonwebtoken")

const User = require("../models/User")

const getUserByToken = async (token)=>{
    if(!token){
        return response.status(401).json({message: "acesso negado"})
    }
    try{
        
    const decoded = jwt.verify(token, "1234")

    const userId = decoded.id

    const user = await User.findOne({where:{id:userId}})

    return user

    }catch(error){
        console.log(error)
        return null
    }
}

module.exports = getUserByToken