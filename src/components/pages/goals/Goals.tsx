import React, { useState } from 'react';
import './Goals.css';
import logoControla from '../../../assets/logo-controla.svg';

function Goals() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('');
  const [financialGoal, setFinancialGoal] = useState<string>('');
  const [goalDeadline, setGoalDeadline] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const formatValue = (value: string): string => {
    // Remove caracteres não numéricos
    const onlyNumbers = value.replace(/\D/g, '');

    // Converte para número e formata como moeda
    if (onlyNumbers === '') return '';

    const number = parseInt(onlyNumbers, 10) / 100;
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    isMonetary: boolean = false
  ) => {
    const { value } = e.target;

    if (isMonetary) {
      // Para campos monetários, formata como moeda
      setter(formatValue(value));
    } else {
      // Para campos não monetários (como prazo), permite apenas números
      if (/^\d*$/.test(value) || value === '') {
        setter(value);
      }
    }
  };

  const parseMonetary = (value: string): number => {
    // Se o valor estiver vazio, retorna 0
    if (!value || value.trim() === '') return 0;
    
    // Remove o símbolo da moeda e espaços
    let cleanValue = value.replace(/R\$\s?/g, '');
    
    // Substitui pontos por nada (remove separadores de milhar)
    cleanValue = cleanValue.replace(/\./g, '');
    
    // Substitui vírgula por ponto (para decimal)
    cleanValue = cleanValue.replace(',', '.');
    
    // Converte para número
    const result = parseFloat(cleanValue);
    
    // Retorna 0 se não for um número válido
    return isNaN(result) ? 0 : result;
  };

  const calculateGoal = () => {
    const income = parseMonetary(monthlyIncome);
    const expenses = parseMonetary(monthlyExpenses);
    const goal = parseMonetary(financialGoal);
    const deadline = parseInt(goalDeadline, 10);

    // Validação do prazo
    if (isNaN(deadline) || deadline < 1) {
      setResult('O prazo da meta deve ser de no mínimo 1 mês.');
      return;
    }

    const monthlySavings = income - expenses;

    if (monthlySavings <= 0) {
      setResult('Suas despesas são maiores ou iguais à sua renda. Revise seu orçamento para conseguir economizar.');
      return;
    }

    const timeNeeded = goal / monthlySavings;
    const requiredSavings = goal / deadline;

    // Formata os valores para exibição
    const formattedMonthlySavings = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(monthlySavings);
    
    const formattedRequiredSavings = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(requiredSavings);
    
    const formattedGoal = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(goal);

    if (requiredSavings > monthlySavings) {
      const realTime = Math.ceil(timeNeeded);
      setResult(`Com sua economia mensal atual de ${formattedMonthlySavings}, você alcançará sua meta em aproximadamente ${realTime} meses, o que é mais do que o prazo desejado de ${deadline} meses.`);
    } else {
      setResult(`Para atingir sua meta de ${formattedGoal} em ${deadline} meses, você precisa economizar pelo menos ${formattedRequiredSavings} por mês. Com sua economia atual de ${formattedMonthlySavings}, você está no caminho certo!`);
    }
  };

  return (
    <div className="calculator-container">
      <header className="header">
        <img src={logoControla} alt="Controla" className="logo" />
      </header>

      <div className="calculator-content">
        <h1>Calculador de Metas</h1>
        
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="monthlyIncome">Renda Mensal:</label>
            <input
              type="text"
              id="monthlyIncome"
              value={monthlyIncome}
              onChange={(e) => handleInputChange(e, setMonthlyIncome, true)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="monthlyExpenses">Despesas Mensais:</label>
            <input
              type="text"
              id="monthlyExpenses"
              value={monthlyExpenses}
              onChange={(e) => handleInputChange(e, setMonthlyExpenses, true)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="financialGoal">Meta Financeira:</label>
            <input
              type="text"
              id="financialGoal"
              value={financialGoal}
              onChange={(e) => handleInputChange(e, setFinancialGoal, true)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="goalDeadline">Prazo de Meta (em meses):</label>
            <input
              type="text"
              id="goalDeadline"
              value={goalDeadline}
              onChange={(e) => handleInputChange(e, setGoalDeadline)}
              placeholder="12"
            />
          </div>

          <button className="calculate-btn" onClick={calculateGoal}>
            Calcular
          </button>
        </div>

        <div className="result-section">
          {result ? (
            <div className="result">
              <p>{result}</p>
            </div>
          ) : (
            <div className="result">
              <p>Preencha os campos e clique em "Calcular" para ver o resultado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Goals;
