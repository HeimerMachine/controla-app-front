import { useState, ChangeEvent, FormEvent } from "react";
import "./Register.css";
import { api } from "../../../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try{
      const response = await api.post(`users/register/`, form)
      toast.success("Cadastro efetuado com sucesso!")
      navigate("/sign-in")
      return response.data

    }
    catch (error){
      toast.error("Houve um problema ao enviar os seus dados!")
    }
    console.log(form);
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
          <img className="logo_controla" src="src\assets\logo-controla.svg" alt="logo_controla" />
            <h2>Crie sua conta</h2>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group-register">
              <label>Como você prefere ser chamado (a)?</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-register">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-register">
              <label>Senha:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-register">
              <label>Confirme sua senha:</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit">Cadastrar-se </button>
              <p><a href="/sign-in" className="login-link">Já tenho uma conta</a> </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;