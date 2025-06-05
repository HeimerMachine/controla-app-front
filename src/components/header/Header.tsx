import './Header.css';
import logo from '../../assets/img/logo-group.png';
import { CircleUserRound } from 'lucide-react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router";


export function Header(){
 const navigate = useNavigate();
  const isLoggedIn = !!Cookies.get("token");
      const handleLogout = () => {
Cookies.remove('token');
navigate('/sign-in');
  };

    return(
        <div className='container-header'>
            <div className='container-elements'>
                <img className='logo' src={logo} alt="" />
            </div>
            <div className='links-header'>
              <a href="#explicacao">Uma breve explicação</a>
              <a href="#quemsomos">Quem somos</a>
                          {!isLoggedIn ? (
            <>
              <a href="/sign-in" className="default-btn">Entrar</a>
              <a href="/sign-up" className="default-btn">Registrar-se</a>

            </>
          ) : (
            <>
            <button onClick={handleLogout} className="default-btn">Sair</button>
            </>
          )}

                

                <CircleUserRound className='profile-icon' />
            </div>
        </div>
    )
}