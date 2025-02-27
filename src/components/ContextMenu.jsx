export default function ContextMenu({
  pos,
  setPos,
  expenses,
  setExpenses,
  rowID,
  setCurrExpense,
  setEditingRowID
}) {
  if (!pos.left || !pos.top) {
    return;
  }
  return (
    <div className="context-menu" style={pos}>
      <div
        onClick={(e) => {
          console.log("Editing");
          const { title, category, amount } = expenses.find(
            (expense) => expense.id === rowID
          );
          setEditingRowID(rowID);
          setCurrExpense({ title, category, amount });
          setPos({});
        }}
      >
        Edit
      </div>
      <div
        onClick={(e) => {
          console.log("Deleting");
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id !== rowID)
          );
          setPos({});
        }}
      >
        Delete
      </div>
    </div>
  );
}
