import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./data/expenseData";

function App() {
  const [expenses, setExpenses] = useState(expenseData);
  const [currExpense, setCurrExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });
  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          currExpense={currExpense}
          setCurrExpense={setCurrExpense}
        />
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          setCurrExpense={setCurrExpense}
        />
      </div>
    </main>
  );
}

export default App;
