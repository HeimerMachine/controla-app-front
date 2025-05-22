import React, { useState } from 'react';
import './Goals.css';
import logoControla from '../../../assets/logo-controla.svg';

function Goals() {
  const [rendaMensal, setRendaMensal] = useState<string>('');
  const [despesasMensais, setDespesasMensais] = useState<string>('');
  const [metaFinanceira, setMetaFinanceira] = useState<string>('');
  const [prazoMeta, setPrazoMeta] = useState<string>('');
  const [resultado, setResultado] = useState<string | null>(null);

  const formatarValor = (valor: string): string => {
    // Remove caracteres não numéricos
    const apenasNumeros = valor.replace(/\D/g, '');

    // Converte para número e formata como moeda
    if (apenasNumeros === '') return '';

    const numero = parseInt(apenasNumeros, 10) / 100;
    return numero.toLocaleString('pt-BR', {
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
      setter(formatarValor(value));
    } else {
      // Para campos não monetários (como prazo), permite apenas números
      if (/^\d*$/.test(value) || value === '') {
        setter(value);
      }
    }
  };

  const calcularMeta = () => {
    // Converte valores monetários para números
    const renda = parseFloat(rendaMensal.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const despesas = parseFloat(despesasMensais.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const meta = parseFloat(metaFinanceira.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const prazo = parseInt(prazoMeta, 10) || 1;

    // Calcula a economia mensal disponível
    const economiaMensal = renda - despesas;

    if (economiaMensal <= 0) {
      setResultado('Suas despesas são maiores ou iguais à sua renda. Revise seu orçamento para poder economizar.');
      return;
    }

    // Calcula quanto tempo levará para atingir a meta com a economia atual
    const tempoNecessario = meta / economiaMensal;

    // Calcula quanto precisa economizar por mês para atingir a meta no prazo
    const economiaNecess = meta / prazo;

    if (economiaNecess > economiaMensal) {
      const tempoReal = Math.ceil(tempoNecessario);
      setResultado(`Com sua economia mensal atual de ${formatarValor(String(economiaMensal * 100))}, você atingirá sua meta em aproximadamente ${tempoReal} meses, o que é mais do que o prazo desejado de ${prazo} meses.`);
    } else {
      setResultado(`Para atingir sua meta de ${metaFinanceira} em ${prazo} meses, você precisa economizar pelo menos ${formatarValor(String(economiaNecess * 100))} por mês. Com sua economia atual de ${formatarValor(String(economiaMensal * 100))}, você está no caminho certo!`);
    }
  };

  return (
    <div className="calculador-container">
      <header className="header">
        <img src={logoControla} alt="Controla" className="logo" />
      </header>

      <div className="calculador-content">
        <h1>Calculador de Metas</h1>

        <div className="form-group">
          <label htmlFor="rendaMensal">Renda mensal:</label>
          <input
            type="text"
            id="rendaMensal"
            value={rendaMensal}
            onChange={(e) => handleInputChange(e, setRendaMensal, true)}
            placeholder="R$ 0,00" />
        </div>

        <div className="form-group">
          <label htmlFor="despesasMensais">Despesas mensais:</label>
          <input
            type="text"
            id="despesasMensais"
            value={despesasMensais}
            onChange={(e) => handleInputChange(e, setDespesasMensais, true)}
            placeholder="R$ 0,00" />
        </div>

        <div className="form-group">
          <label htmlFor="metaFinanceira">Meta financeira:</label>
          <input
            type="text"
            id="metaFinanceira"
            value={metaFinanceira}
            onChange={(e) => handleInputChange(e, setMetaFinanceira, true)}
            placeholder="R$ 0,00" />
        </div>

        <div className="form-group">
          <label htmlFor="prazoMeta">Prazo de Meta(em meses):</label>
          <input
            type="text"
            id="prazoMeta"
            value={prazoMeta}
            onChange={(e) => handleInputChange(e, setPrazoMeta)}
            placeholder="12" />
        </div>

        <button className="calcular-btn" onClick={calcularMeta}>
          Calcular
        </button>

        {resultado && (
          <div className="resultado">
            <p>{resultado}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Goals;
