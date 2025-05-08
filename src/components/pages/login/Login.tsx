import "./Login.css";

export function Login() {
    return (
        <div className="container_login">
            <form className="form_login">
                <img className="logo_controla" src="src\assets\logo-controla.svg" alt="logo_controla" />
                <h2>Faça login na sua conta!</h2>
                <div className="input_container">
                    <label>Email:</label>
                    <input type="email" placeholder="Digite o seu email" />
                </div>
                <div className="input_container">
                    <label>Senha:</label>
                    <input type="password" placeholder="Digite a sua senha" />
                    <a href="" className="link_password">Esqueci a senha.</a>
                </div>
                <button className="button_login" >Entrar</button>
                <a href="" className="link_to_register">Não tenho uma conta.</a>
            </form>
        </div>
    )
}import "./Login.css";

export function Login() {
    return (
        <div className="container_login">
            <form className="form_login">
                <img className="logo_controla" src="src\assets\logo-controla.svg" alt="logo_controla" />
                <h2>Faça login na sua conta!</h2>
                <div className="input_container">
                    <label>Email:</label>
                    <input type="email" placeholder="Digite o seu email" />
                </div>
                <div className="input_container">
                    <label>Senha:</label>
                    <input type="password" placeholder="Digite a sua senha" />
                    <a href="" className="link_password">Esqueci a senha.</a>
                </div>
                <button className="button_login" >Entrar</button>
                <a href="/sign-up" className="link_to_register">Não tenho uma conta.</a>
            </form>
        </div>
    )
}