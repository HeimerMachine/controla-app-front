import { useState } from "react";
import "./Calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const categories = [
  "Alimentação", "Lazer", "Saúde", "Roupas e acessórios", "Dívidas", "Contas", "Outros tipos de gastos"
];

const Calendar = () => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [newTransaction, setNewTransaction] = useState({
    type: "",
    description: "",
    amount: "",
    category: ""
  });

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleMonthChange = (direction: number) => {
    let newMonth = selectedMonth + direction;
    let newYear = selectedYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const openModal = (day: number) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionType(e.target.value);
    setNewTransaction({ ...newTransaction, type: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
    setNewTransaction({ ...newTransaction, category: e.target.value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    console.log("Transaction:", { ...newTransaction });
    setNewTransaction({ type: "", description: "", amount: "", category: "" });
    setTransactionType("");
    setSelectedCategory("");
    setIsModalOpen(false);
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(<td key={`empty-${i}`}></td>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(
      <td key={day} className="calendar-day" onClick={() => openModal(day)}>
        {day}
      </td>
    );
  }

  const rows = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    rows.push(<tr key={i}>{calendarCells.slice(i, i + 7)}</tr>);
  }

  return (
    <div className="calendar-container">
      <h1>{months[selectedMonth]} {selectedYear}</h1>

      <div className="month-selector">
        <label>Mês: </label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>

        <label style={{ marginLeft: "10px" }}>Ano: </label>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          style={{ width: "80px" }}
        />
      </div>

      <div className="calendar-wrapper">
        <div className="arrow-left">
          <ChevronLeft className="arrow" onClick={() => handleMonthChange(-1)} />
        </div>

        <div className="calendar-content">
          <table className="calendar-table">
            <thead>
              <tr>
                <th>Dom</th>
                <th>Seg</th>
                <th>Ter</th>
                <th>Qua</th>
                <th>Qui</th>
                <th>Sex</th>
                <th>Sáb</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>

        <div className="arrow-right">
          <ChevronRight className="arrow" onClick={() => handleMonthChange(1)} />
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
          checked={transactionType === "Receitas"}
          onChange={handleTypeChange}
        />
        Receitas
      </label>
      <label>
        <input
          type="radio"
          name="type"
          value="Despesas"
          checked={transactionType === "Despesas"}
          onChange={handleTypeChange}
        />
        Despesas
      </label>
    </div>


    {transactionType === "Receitas" && (
      <div className="input-group">
        <label>Descrição:</label>
        <input name="description" value={newTransaction.description} onChange={handleChange} />

        <label>Quantidade:</label>
        <input name="amount" value={newTransaction.amount} onChange={handleChange} />
      </div>
    )}


{transactionType === "Despesas" && (
  <div className="input-group">
    <label>Descrição:</label>
    <input name="description" value={newTransaction.description} onChange={handleChange} />

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
          {category}
        </label>
      ))}
    </div>
  </div>
)}

    {transactionType && (
      <div className="button-group">
        <button className="add-btn" onClick={handleAddTransaction}>Adicionar</button>
        <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancelar</button>
      </div>
    )}
  </div>
)}
    </div>
  );
};

export default Calendar;