import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { createIncome, createExpense, getAllTransactions } from "../../../lib/api";




const categoryColors: { [key: string]: string } = {
  ALIMENTACAO: '#FF0004',
  LAZER: '#65D067',
  SAUDE: '#009DFF',
  ROUPAS_E_ACESSORIOS: '#FF18AE',
  DIVIDAS: '#FFA600',
  CONTAS: '#D900FF',
  OUTROS_TIPOS_DE_GASTOS: '#795548'
};

const MyCalendar: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [dailyTransactions, setDailyTransactions] = useState<any[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: ''
  });

const categories = [
  'ALIMENTACAO',
  'LAZER',
  'SAUDE',
  'ROUPAS_E_ACESSORIOS',
  'DIVIDAS',
  'CONTAS',
  'OUTROS_TIPOS_DE_GASTOS'
];

const categoryLabels: Record<string, string> = {
  ALIMENTACAO: 'Alimentação',
  LAZER: 'Lazer',
  SAUDE: 'Saúde',
  ROUPAS_E_ACESSORIOS: 'Roupas e acessórios',
  DIVIDAS: 'Dívidas',
  CONTAS: 'Contas',
  OUTROS_TIPOS_DE_GASTOS: 'Outros tipos de gastos'
};




useEffect(() => {
  (async () => {
    try {
      const response = await getAllTransactions();
      const data = response.finances || []; 
      const mapped = data.map((t: any) => ({
        ...t,
        color: t.type === 'INCOME' ? '#4caf50' : categoryColors[t.category] || '#f44336',
        date: new Date(t.date).toDateString(),
        amount: parseFloat(t.amount),
        type: t.type === 'INCOME' ? 'Receitas' : 'Despesas'
      }));
      setTransactions(mapped);
    } catch (err) {
      console.error("Erro ao buscar transações:", err);
    }
  })();
}, []);
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    setTransactionType('');
    setNewTransaction({ description: '', amount: '', category: '' });
    setSelectedCategory('');
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionType(e.target.value);
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setNewTransaction(prev => ({ ...prev, [name]: value }));
};

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
    setNewTransaction(prev => ({ ...prev, category: e.target.value }));
  };

const handleSave = async () => {
  try {
    if (!transactionType || !newTransaction.description || !newTransaction.amount) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    if (transactionType === 'Despesas' && !selectedCategory) {
      alert("Por favor, selecione uma categoria.");
      return;
    }

      if (isNaN(Number(newTransaction.amount))) {
      alert('A quantidade deve ser um número válido.');
      return;
    }

    if (transactionType === 'Despesas' && !selectedCategory) {
      alert("Por favor, selecione uma categoria.");
      return;
    }


    const payload: any = {
      amount: parseFloat(newTransaction.amount),
      description: newTransaction.description,
      date: selectedDate.toISOString()
    };

    if (transactionType === 'Despesas') {
      payload.category = selectedCategory;
      await createExpense(payload);
    } else {
      await createIncome(payload);
    }


    const localItem = {
      ...payload,
      type: transactionType,
      category: transactionType === 'Despesas' ? selectedCategory : '',
      date: selectedDate.toDateString(),
      color: transactionType === 'Receitas'
        ? '#4caf50'
        : categoryColors[selectedCategory] || '#f44336'
    };

    setTransactions(prev => [...prev, localItem]);


    setIsModalOpen(false);
    setTransactionType('');
    setNewTransaction({ description: '', amount: '', category: '' });
    setSelectedCategory('');
  } catch (error) {
    console.error("Erro ao salvar:", error);
    alert("Erro ao salvar transação. Verifique o console para mais detalhes.");
  }
};

  const openDailyTransactions = (date: Date) => {
    const list = transactions.filter(t => new Date(t.date).toDateString() === date.toDateString());
    setDailyTransactions(list);
  };

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const filteredByMonth = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

const expensesByCategory = categories.reduce((acc, category) => {
  acc[category] = filteredByMonth
    .filter(t => t.type === 'Despesas' && t.category === category)
    .reduce((sum, t) => sum + t.amount, 0);
  return acc;
}, {} as Record<string, number>);

  const totalReceitas = filteredByMonth
    .filter(t => t.type === 'Receitas')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDespesas = filteredByMonth
    .filter(t => t.type === 'Despesas')
    .reduce((sum, t) => sum + t.amount, 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="calendar-wrapper">
      <div className="calendar-container">
        <h1>Calendário Financeiro</h1>

        <Calendar
          onClickDay={handleDateChange}
          value={selectedDate}
            onActiveStartDateChange={({ activeStartDate }) => {
    if (activeStartDate) setSelectedDate(activeStartDate);
  }}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const dayItems = transactions.filter(
                (t) => new Date(t.date).toDateString() === date.toDateString()
              );

              const visibleItems = dayItems.slice(0, 2);
              const hiddenCount = dayItems.length - visibleItems.length;

              return (
                <ul className="event-list">
                  {visibleItems.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        backgroundColor: item.color,
                        color: 'white',
                        borderRadius: '4px',
                        padding: '1px 4px',
                        marginBottom: '2px',
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTransaction(item);
                      }}
                    >
                      {item.description}
                    </li>
                  ))}
                  {hiddenCount > 0 && (
                    <li
                      style={{
                        fontSize: '0.7rem',
                        color: '#999',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openDailyTransactions(date);
                      }}
                    >
                      +{hiddenCount} mais
                    </li>
                  )}
                </ul>
              );
            }
            return null;
          }}
        />
      </div>

      <div className="summary-panel">
        <div className="finance-summary">
          <h3>Cadastro de finanças</h3>

<ul>
  {categories.map((cat, i) => (
    <li key={i}>
      <span style={{ color: categoryColors[cat] }}>&#9679;</span>{' '}
      Gastos com {categoryLabels[cat].toLowerCase()}: R$ {expensesByCategory[cat]?.toFixed(2) || '0.00'}
    </li>
  ))}
</ul>
        </div>

        <div className="controle-summary">
          <h3>Controle</h3>
      <p>Receitas: R$ {Number(totalReceitas || 0).toFixed(2)}</p>
      <p>Despesas: R$ {Number(totalDespesas || 0).toFixed(2)}</p>
      <p>Saldo: R$ {Number(saldo || 0).toFixed(2)}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <h2 className="adicionar">Adicionar Receitas/Despesas</h2>
          <h2>Tipo:</h2>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="type"
                value="Receitas"
                checked={transactionType === 'Receitas'}
                onChange={handleTypeChange}
              />
              Receitas
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="Despesas"
                checked={transactionType === 'Despesas'}
                onChange={handleTypeChange}
              />
              Despesas
            </label>
          </div>

          {transactionType === 'Receitas' && (
            <div className="input-group">
              <label>Descrição:</label>
              <textarea
  name="description"
  value={newTransaction.description}
  onChange={handleChange}
  rows={3}
  style={{ width: '100%', resize: 'none' }}
/>

              <label>Quantidade:</label>
              <input name="amount" value={newTransaction.amount} onChange={handleChange} />
            </div>
          )}

          {transactionType === 'Despesas' && (
            <div className="input-group">
              <label>Descrição:</label>
              <textarea
  name="description"
  value={newTransaction.description}
  onChange={handleChange}
  rows={3}
  style={{ width: '100%', resize: 'none' }}
/>

              <label>Quantidade:</label>
              <input name="amount" value={newTransaction.amount} onChange={handleChange} />

              <label>Categoria:</label>
<div className="radio-group-categories">
  {categories.map((category, index) => (
    <label key={index}>
      <input
        type="radio"
        name="category"
        value={category}
        checked={selectedCategory === category}
        onChange={handleCategoryChange}
      />
      {categoryLabels[category]}
    </label>
  ))}
</div>
            </div>
          )}

          <div className="button-group">
            <button className="add-btn" onClick={handleSave}>Salvar</button>
            <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {selectedTransaction && (
        <div className="modal">
          <h2>Detalhes da {selectedTransaction.type}</h2>
          <p><strong>Descrição:</strong> {selectedTransaction.description}</p>
          <p><strong>Quantidade:</strong> R$ {selectedTransaction.amount}</p>
          {selectedTransaction.type === 'Despesas' && (
   <p><strong>Categoria:</strong> {categoryLabels[selectedTransaction.category]}</p>
          )}
          <p><strong>Data:</strong> {selectedTransaction.date}</p>

          <div className="button-group">
            <button className="cancel-btn" onClick={() => setSelectedTransaction(null)}>Fechar</button>
          </div>
        </div>
      )}

      {dailyTransactions.length > 0 && (
        <div className="modal">
          <h2>Transações do Dia</h2>
          <div className="daily-list">
            {dailyTransactions.map((item, index) => (
              <div key={index} className="daily-item">
                <span className="tipo">{item.type}:</span>
                <span className="descricao">{item.description}</span>
                <span className="quantidade"> — R$ {item.amount}</span>
                {item.type === 'Despesas' && (
                  <span className="categoria"> ({item.category})</span>
                )}
              </div>
            ))}
          </div>
          <div className="button-group">
            <button className="cancel-btn" onClick={() => setDailyTransactions([])}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;