const { DataTypes } = require("sequelize")

const db = require("../db/conn")
const User = db.define("User", {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    cpf: {
        type: DataTypes.STRING,
        require: true
    },

    birth: {
        type: DataTypes.DATE,
        require: true
    },
    phone: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
    image: {
        type: DataTypes.BLOB,
    }

})


module.exports = User