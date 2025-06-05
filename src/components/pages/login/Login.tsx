import "./Login.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import Cookies from "js-cookie"
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


interface FormState {
  email: string;
  password: string;
}

export function Login() {

    const navigate = useNavigate();
    
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(form);
    try{
      const response = await api.post(`users/login/`, form)
      Cookies.set("token", response.data.token, {expires: 1/2})
      toast.success("Login efetuado com sucesso!")
     navigate("/")
    }
    catch (error){
      toast.error("Houve um problema ao enviar os seus dados!")
    }
  };


    return (
        <div className="container_login">
            <form onSubmit={handleSubmit} className="form_login">
                <img className="logo_controla" src="src\assets\logo-controla.svg" alt="logo_controla" />
                <h2>Faça login na sua conta!</h2>
                <div className="input_container">
                    <label>Email:</label>
                    <input value={form.email} name="email" onChange={handleChange} type="email" placeholder="Digite o seu email" required/>
                </div>
                <div className="input_container">
                    <label>Senha:</label>
                    <input value={form.password} name="password" onChange={handleChange} type="password" placeholder="Digite a sua senha" required/>
                    <a href="" className="link_password">Esqueci a senha.</a>
                </div>
                <button className="button_login" >Entrar</button>
                <a href="/sign-up" className="link_to_register">Não tenho uma conta.</a>
            </form>
        </div>
    )
}