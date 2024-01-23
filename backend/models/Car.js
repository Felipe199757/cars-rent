const {DataTypes, Sequelize} = require("sequelize")

const db = require("../db/conn")
const User = require("./User")

const Car = db.define("Car", {
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    licensePlate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isRented: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    // images:{
    //     type: DataTypes.ARRAY(Sequelize.STRING)
    // }
})

Car.belongsTo(User)
User.hasOne(Car)


module.exports = Car
