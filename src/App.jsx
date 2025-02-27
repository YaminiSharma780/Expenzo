import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./data/expenseData";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [currExpense, setCurrExpense] = useLocalStorage("currExpense", {
    title: "",
    category: "",
    amount: "",
  });

  const [expenses, setExpenses] = useLocalStorage("expenses", expenseData);

  const [editingRowID, setEditingRowID] = useLocalStorage("editingRowID", "");

  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          currExpense={currExpense}
          setCurrExpense={setCurrExpense}
          editingRowID={editingRowID}
          setEditingRowID={setEditingRowID}
        />
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          setCurrExpense={setCurrExpense}
          setEditingRowID={setEditingRowID}
        />
      </div>
    </main>
  );
}

export default App;
