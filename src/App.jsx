import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import expenseData from "./data/expenseData";
import useLocalStorage from "./hooks/useLocalStorage";
import ExpenseTableBigScreen from "./components/ExpenseTableBigScreen";
import ExpenseTableSmallScreen from "./components/ExpenseTableSmallScreen";

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
        <span className="small-screen-table">
          <ExpenseTableSmallScreen
            expenses={expenses}
            setExpenses={setExpenses}
            setCurrExpense={setCurrExpense}
            setEditingRowID={setEditingRowID}
          />
        </span>
        <span className="big-screen-table">
          <ExpenseTableBigScreen
            expenses={expenses}
            setExpenses={setExpenses}
            setCurrExpense={setCurrExpense}
            setEditingRowID={setEditingRowID}
          />
        </span>
      </div>
    </main>
  );
}

export default App;
