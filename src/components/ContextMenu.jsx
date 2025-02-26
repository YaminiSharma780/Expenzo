export default function ContextMenu({
  pos,
  setPos,
  expenses,
  setExpenses,
  rowID,
  setCurrExpense,
}) {
  if (!pos.left || !pos.top) {
    return;
  }
  return (
    <div className="context-menu" style={pos}>
      <div
        onClick={(e) => {
          console.log("Editing");
          // expenses.filter((expense) => {
          //   if(expense.id == rowID){
          //     console.log(expense);
          //     setCurrExpense(expense);
          //   }
          // });
          const { title, category, amount } = expenses.find(
            (expense) => expense.id === rowID
          );
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
