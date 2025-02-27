import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./data/expenseData";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [currExpense, setCurrExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const [expenses, setExpenses] = useState(expenseData);

  const [editingRowID, setEditingRowID] = useState("");

  const [localStorageData, setLocalStorageData] = useLocalStorage(
    "myArr",
    [1, 2, 3]
  );

  return (
    <main>
      <h1
        onClick={() => {
          // setLocalStorageData([4, 5, 6]);
          setLocalStorageData((prevState) => [...prevState, 4, 5, 6]);
        }}
      >
        Track Your Expense
      </h1>
      <h2>{localStorageData.join(", ")}</h2>
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
