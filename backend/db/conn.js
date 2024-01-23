const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("carsrent", "root", "1234", {
    host: "localhost",
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log("conectou")
}catch(error){
    console.log(`Não foi possivél conectar ao banco ${error}`)
}

module.exports = sequelize