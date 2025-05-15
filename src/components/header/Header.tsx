import './Header.css';
import logo from '../../assets/img/logo-group.png';
import { CircleUserRound } from 'lucide-react';


export function Header(){

    return(
        <div className='container-header'>
            <div className='container-elements'>
                <img className='logo' src={logo} alt="" />
            </div>
            <div className='links-header'>
                <a href="#explicacao">Uma breve explicação</a>
                <a href="#quemsomos">Quem somos</a>
                <CircleUserRound className='profile-icon' />
            </div>
        </div>
    )
}