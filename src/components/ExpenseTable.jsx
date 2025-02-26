import React, { useEffect, useState } from "react";
import "../App.css";
import ContextMenu from "./ContextMenu";
export default function ExpenseTable({ expenses, setExpenses, setCurrExpense}) {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.amount;
    });
    setTotalAmount(total);
  }, [expenses]);

  const [pos, setPos] = useState({});
  const [rowID, setRowID] = useState("");

  return (
    <>
      <ContextMenu
        pos={pos}
        setPos={setPos}
        expenses={expenses}
        setExpenses={setExpenses}
        rowID={rowID}
        setCurrExpense={setCurrExpense}
      />
      <table onClick={(e) => setPos({})} className="expense-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <select>
                <option value="">All</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothes">Clothes</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({ id, title, category, amount }) => {
            return (
              <tr
                key={id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  // console.log(e.target);
                  setRowID(id);
                  console.log(rowID);
                  console.log(e.clientX, e.clientY);
                  setPos({ left: e.clientX + 5, top: e.clientY + 5 });
                }}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>₹{amount}</td>
              </tr>
            );
          })}
          <tr>
            <th>Total</th>
            <th></th>
            <th>₹{totalAmount}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
