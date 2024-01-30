const { Association } = require("sequelize");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const Car = require("../models/Car");
const User = require("../models/User");

module.exports = class CarController {
  static async register(request, response) {
    const { model, brand, age, licensePlate, isRented } = request.body;
    const images = request.files

    if (!model) {
      response.status(422).json({ message: "Modelo do veículo é necessário" });
      return;
    }

    if (!brand) {
      response.status(422).json({ message: "Marca do veículo é necessária" });
      return;
    }

    if (!age) {
      response.status(422).json({ message: "Ano do veículo é necessário" });
      return;
    }
    if (!licensePlate) {
      response.status(422).json({ message: "Placa do veículo é obrigatória" });
      return;
    }

    const checkLicensePlate = await Car.findOne({
      where: { licensePlate: licensePlate },
    });

    if (checkLicensePlate) {
      response.status(422).json({ message: "Veiculo já registrado" });
      return;
    }
    const car = {
      model,
      brand,
      age,
      licensePlate,
      images: [],
      isRented: false
    };

    images.map((image) => {
      car.images.push(image.filename)
    })

    try {
      await Car.create(car);
      response.status(200).json({ message: "Veículo registrado com sucesso" });
    } catch (error) {
      response
        .status(500)
        .json({ message: `Erro ao registrar o veículo ${error}` });
    }
  }
  static async editCar(request, response) {
    const id = request.params.id;
    const { model, brand, age, licensePlate } = request.body;
    const images = request.files
    const car = await Car.findOne({ where: { id: id } });

    car.model = model || car.model
    car.brand = brand || car.brand
    car.age = age || car.age
    car.licensePlate = licensePlate || car.licensePlate
    car.images = car.images = images.map((image) => image.filename) || car.images;

    try {
      await car.save();
      response.status(200).json({ message: "Veículo editado com sucesso !!!" });
    } catch (error) {
      response
        .status(500)
        .json({ message: `Erro ao editar o veiculo ${error}` });
    }
  }
  static async getAll(request, response) {
    const cars = await Car.findAll({
      attributes: { exclude: ["licensePlate"] },
    });
    response.status(200).json({ cars });
  }
  static async getCarById(request, response) {
    const id = request.params.id;

    const car = await Car.findOne({ where: { id: id } });

    response.status(200).json({ car });
  }
  static async rentCar(request, response) {
    const id = request.params.id

    const car = await Car.findOne({ where: { id: id } })

    const token = getToken(request)
    const user = await getUserByToken(token)

    console.log(user)
    const rentedCar = await Car.findOne({ where: { UserId: user.id } })
    if (rentedCar) {
      response.status(422).json({ message: "Você já tem um veiculo alugado" })
      return
    }

    console.log(`aqui esta o usuario ${user}`)
    if (!car) {
      response.status(422).json({ message: "Veiculo não encontrado" })
      return
    }

    if (car.isRented) {
      response.status(422).json({ message: "Veiculo já alugado" })
      return
    }
    try {
      await user.setCar(car)
      await car.update({ isRented: true })
      response.status(200).json({ message: "Veiculo alugado com sucesso, você tem 24 horas para retirar o veiculo" })

    } catch (error) {
      response.status(500).json({ message: `Algo deu errado: ${error}` })
    }


  }
};
