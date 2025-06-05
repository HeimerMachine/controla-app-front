import './LandingPage.css';
import { Header } from '../../header/Header';
import image from '../../../assets/img/img-Financial.png'
import { CalendarDays, ChartNoAxesCombined, Linkedin, Github, Instagram } from 'lucide-react';
import woman from '../../../assets/img/img-woman.png'
import people from '../../../assets/img/img-people.png'
import { useNavigate } from 'react-router-dom';



export function LandingPage(){
const navigate = useNavigate();

const handleGoToCalendar = () => {
  navigate('/calendar');
};

const handleGoToGoals = () => {
  navigate('/goals');
};
    return(
        <div className='container-landing'>
            <Header/>

            <section className='section-buttons'>
                <div className='container-buttons'>
                    <img className='img-1' src={image} alt="" />
                    <div id='blur-1' className='blur'></div>
                    <div className='buttons'>
               <button className='button-landing' onClick={handleGoToCalendar}>
               <CalendarDays className='icon' /> Consultar calendário
               </button>
               <button className='button-landing' onClick={handleGoToGoals}>
               <ChartNoAxesCombined className='icon' /> Calcular uma meta 
               </button>
                    </div>
                </div>
            </section>

            <section id='explicacao'>
                <div className='container-texts'>
                    <div className='text-group-left'>
                        <div className='only-text-left'>
                            <h2>
                                Por que controlar suas finanças pessoais?
                            </h2>
                            <p>
                                Controlar suas finanças não é só para quem ganha muito. Saber quanto entra e quanto sai todo mês é essencial para evitar dívidas, criar uma reserva de emergência e realizar sonhos como viagens, casa própria ou aposentadoria tranquila.
                            </p>
                        </div>
                        <img className='text-images' src={woman} alt="" />
                        <div id='blur-2' className='blur'></div>
                    </div>
                    <div className='text-group-right'>
                        <img className='text-images' src={people} alt="" />
                        <div id='blur-3' className='blur'></div>
                        <div className='only-text-right'>
                            <h2>
                                Receita, Despesa e Saldo: entenda a base                            
                            </h2>
                            <ul className='list'>
                                <li>Receita: tudo que você ganha (salário, bicos, vendas).</li>
                                <li>Despesa: tudo que você gasta (contas, mercado, lazer).</li>
                                <li>Saldo: o que sobra no fim (receita - despesa).</li>
                                
                            </ul>
                        </div>
                    </div>
                    <div className='text-group'>
                        <div className='only-text'>
                                <h2>
                                    A importância da reserva de emergência
                                </h2>
                                <p>
                                    Imprevistos acontecem: demissão, problemas de saúde ou consertos caros. Ter uma reserva com 3 a 6 meses do seu custo de vida guardados é essencial. Comece guardando aos poucos todo mês, como uma despesa fixa.
                                </p>
                            </div>
                            <div className='only-text'>
                                <h2>
                                    Gasto invisível: o vilão do seu bolso
                                </h2>
                                <p>
                                    Pequenos gastos diários, como delivery, cafezinho ou assinatura esquecida, somam MUITO no fim do mês. Anote por uma semana tudo o que gasta sem pensar — você vai se surpreender!
                                </p>
                            </div>
                            <div className='only-text'>
                                <h2>
                                    Dica rápida: método 50/30/20
                                </h2>
                                <ul className='list'>
                                    <li>50% do que você ganha: necessidades (contas, comida, aluguel)</li>
                                    <li>30%: desejos (lazer, viagens)</li>
                                    <li>20%: investimentos e dívidas Esse método ajuda a manter um equilíbrio saudável no uso do dinheiro.</li>
                                </ul>
                            </div>
                    </div>
                </div>
            </section>

            <section id='quemsomos'>

                <div className='footer'>
                    <div className='member'>
                        <h3>Beatriz Alves</h3>
                        <div className='socialMedia'>
                            <Github className='icon'/><Instagram className='icon'/><Linkedin className='icon'/>
                        </div>
                    </div>
                    <div className='member'>
                        <h3>Deglier Fernandes</h3>
                        <div className='socialMedia'>
                            <Github className='icon'/><Instagram className='icon'/><Linkedin className='icon'/>
                        </div>
                    </div>
                    <div className='member'>
                        <h3>Matheus Moreira</h3>
                        <div className='socialMedia'>
                            <Github className='icon'/><Instagram className='icon'/><Linkedin className='icon'/>
                        </div>
                    </div>
                    <div className='member'>
                        <h3>Samuel Marcos Holanda</h3>
                        <div className='socialMedia'>
                            <Github className='icon'/><Instagram className='icon'/><Linkedin className='icon'/>
                        </div>
                    </div>
                    <div className='member'>
                        <h3>Yasmin Dantas</h3>
                        <div className='socialMedia'>
                            <Github className='icon'/><Instagram className='icon'/><Linkedin className='icon'/>
                        </div>
                    </div>
                    <div className='member'>
                        <h3>Thulio Bezerra</h3>
                        <div className='socialMedia'>
                            <Github className='icon'/><Instagram className='icon'/><Linkedin className='icon'/>
                        </div>
                    </div>
                </div>
                <p>2025 © HeimerMachine - Todos os direitos reservados. Termos e condições. Políticas de privacidade.</p>
            </section>

        </div>
    )
}