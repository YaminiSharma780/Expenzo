export default function ContextMenu({ pos, setPos, setExpenses, rowID}) {
  if (!pos.left || !pos.top) {
    return;
  }
  return (
    <div className="context-menu" style={pos}>
      <div onClick={(e)=>{
        console.log("Editing");
        setPos({});
      }}>Edit</div>
      <div onClick={(e)=>{
        console.log("Deleting");
        setExpenses((prevState)=> prevState.filter((expense) => expense.id !== rowID))
        setPos({});
      }}>Delete</div>
    </div>
  );
}
