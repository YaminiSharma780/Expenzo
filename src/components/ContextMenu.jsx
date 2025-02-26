export default function ContextMenu({ pos }) {
  if (!pos.left || !pos.top) {
    return;
  }
  return (
    <div className="context-menu" style={pos}>
      <div onClick={(e)=>{
        console.log("Editing");
      }}>Edit</div>
      <div onClick={(e)=>{
        console.log("Deleting");
        
      }}>Delete</div>
    </div>
  );
}
