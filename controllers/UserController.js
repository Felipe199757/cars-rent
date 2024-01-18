const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* helpers */
const validarCpf = require("../helpers/validation-cpf");
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(request, response) {
    const { name, email, cpf, birth, phone, password, confirmpassword, image } =
      request.body;
      
      if (!name) {
        response.status(422).json({ message: "Nome é obrigatorio" });
        return;
      }
      
      if (!email) {
        response.status(422).json({ message: "E-mail é obrigatorio" });
        return;
      }
      const checkIfUserExists = await User.findOne({ where: { email: email } });
      
      if (checkIfUserExists) {
        response.status(422).json({ message: "Usuario já cadastrado" });
        return;
      }
      if (!cpf) {
        response.status(422).json({ message: "cpf é obrigatorio" });
        return;
      }
      const cpfValidado = validarCpf(cpf);
      
    if (!cpfValidado) {
      response.status(422).json({ message: "cpf inválido" });
      return;
    } else {
      console.log("cpf validado");
    }
    const checkIfCpfExists = await User.findOne({ where: { cpf: cpf } });

    if (checkIfCpfExists) {
      response.status(422).json({ message: "cpf já cadastrado" });
      return;
    }
    if (!birth) {
      response
        .status(422)
        .json({ message: "Data de nascimento é obrigatoria" });
      return;
    }

    if (!phone) {
      response.status(422).json({ message: "Telefone é obrigatorio" });
      return;
    }
    if (!password) {
      response.status(422).json({ message: "Senha é obrigatoria" });
      return;
    }
    if (!confirmpassword) {
      response
        .status(422)
        .json({ message: "Confirmação de senha é obrigatoria" });
      return;
    }
    if (password !== confirmpassword) {
      response.status(422).json({ message: "Senhas não conferem" });
      return;
    }

    const salt = await bcrypt.genSalt(12);

    const passwordHashed = await bcrypt.hash(password, salt);

    const user = {
      name,
      email,
      cpf,
      birth,
      phone,
      password: passwordHashed,
      image,
    };
    try {
      const newUser = await User.create(user);
      await createUserToken(newUser, request, response);
      //   response.status(200).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      response
        .status(500)
        .json({ message: `usuario não cadastrado: ${error}` });
    }
  }
  static async login(request, response) {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      response.status(422).json({ message: "Senha e/ou email invalido" });
      return;
    }
    if (!email) {
      response.status(422).json({ message: "Por favor, insira o e-mail" });
      return;
    }
    if (!password) {
      response.status(422).json({ message: "Por favor, insira a senha" });
      return;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      response.status(422).json({ message: "Senha e/ou email invalido" });
      return;
    }
    await createUserToken(user, request, response);
  }
  static async logout(request, response){
    const token = getToken(request)
    const user = getUserByToken(token)

    try{
      token = null
      response.status(200).json({message: "Deslogado com sucesso!!!"})
    }catch(error){
      response.status(500).json(`Ocorreu um erro ${error}`)
    }
    console.log(token)
  }
  static async checkUser(request, response) {
    let currentUser;
    if (request.headers.authorization) {
      const token = getToken(request);
      const decoded = jwt.verify(token, "1234");
      currentUser = await User.findOne({ where: { id: decoded.id } });
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }
    response.status(200).send(currentUser);
  }
  static async getUserById(request, response) {
    const id = request.params.id;
    const user = await User.findOne({
      where: { id: id },
      attributes: { exclude: ["password", "cpf"] },
    });

    if (!user) {
      response.status(422).json({ message: "Usuário não encontrado" });
      return;
    }

    response.status(200).json({ user });
  }
  static async editUser(request, response) {

    // const id = request.params.id;

    const token = getToken(request);
    const user = await getUserByToken(token);

    const { name, email, phone, password, confirmpassword } = request.body;

    if (!name) {
      response.status(422).json({ message: "Nome é obrigátorio" });
      return;
    }
    user.name = name;

    if (!email) {
      response.status(422).json({ message: "E-mail é obrigátorio" });
      return;
    }
    
    const checkIfUserExists = await User.findOne({ where: { email: email } });
    
    if (user.email !== email && checkIfUserExists) {
      response.status(422).json({ message: "E-mail ja cadastrado!!!" });
      return;
    }
    user.email = email;

    if (!phone) {
      response.status(422).json({ message: "Telefone é obrigátorio" });
      return;
    }

    user.phone = phone;

    
    if (password && password !== confirmpassword) {
        response.status(422).json({ message: "Senhas não conferem" })
        return
    } else if (password && password === confirmpassword) {

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash
    }

    try{
        await user.save()
        response.status(200).json({ message: "Usuário atualizado com sucesso!!!" })
    }catch(error){
        response.status(500).json({ message: error })
        return
    }

  }
};
