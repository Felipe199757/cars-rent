import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import Input from "../../form/Input";
import styles from "../../form/form.module.css"

import { Context } from "../../../context/UserContext";

function Register() {
  const [user, setUser] = useState({})
  const { register } = useContext(Context)


   function handleChange(e){
      setUser({...user, [e.target.name]:e.target.value})
   }

   function handleSubmit(e){
    e.preventDefault()
    register(user)
  }
    
   return ( 
        <section className={styles.form_container}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
        <Input
          text="nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="cpf"
          type="text"
          name="cpf"
          placeholder="Digite o seu cpf"
          handleOnChange={handleChange}
        />
        <Input
          text="Data de Nascimento"
          type="date"
          name="birth"
          placeholder="Digite a data do seu nascimento"
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone"
          type="number"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Digite a confirmação da senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Cadastrar"/>
        </form>
        <p>
            Já possui cadastro <Link to="/login">Clique aqui!</Link>
        </p>
        </section> 
    );
}

export default Register;
