import React, { useState } from "react";
import "../App.css";
import ContextMenu from "./ContextMenu";
import useFilter from "../hooks/useFilter";
export default function ExpenseTableSmallScreen({
  expenses,
  setExpenses,
  setCurrExpense,
  setEditingRowID,
}) {
  const [filteredData, setQuery] = useFilter(expenses, (data) => data.category);
  const total = filteredData.reduce(
    (accumulator, current) => accumulator + parseInt(current.amount),
    0
  );
  const items = filteredData.reduce((accumulator) => accumulator + 1, 0);

  const [pos, setPos] = useState({});
  const [rowID, setRowID] = useState("");
  const [sortCallBack, setSortCallBack] = useState(() => () => {});

  return (
    <>
      <ContextMenu
        pos={pos}
        setPos={setPos}
        expenses={expenses}
        setExpenses={setExpenses}
        rowID={rowID}
        setCurrExpense={setCurrExpense}
        setEditingRowID={setEditingRowID}
      />
      <table
        onClick={() => {
          if (pos.left) {
            setPos({});
          }
        }}
        className="expense-table"
      >
        <thead>
          <tr>
            <th className="title-column-th">
              <div className="select-div">
                <>
                  <select
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                  >
                    <option value="">Category</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Bills">Bills</option>
                    <option value="Education">Education</option>
                    <option value="Medicine">Medicine</option>
                  </select>
                </>
              </div>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => {
                    setSortCallBack(() => (a, b) => a.amount - b.amount);
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    setSortCallBack(() => (a, b) => b.amount - a.amount);
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 384 512"
                  className="arrow reset-arrow"
                  onClick={() => {
                    setSortCallBack(() => () => {});
                  }}
                >
                  <title>Reset</title>
                  <path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-112 0c-17.7 0-32-14.3-32-32l0-128 32 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96l112 0zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128-32 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0 0-128c0-53-43-96-96-96L304 96z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .sort(sortCallBack)
            .map(({ id, title, category, amount }) => {
              return (
                <tr
                  key={id}
                  className="flexible-row"
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setRowID(id);
                    setPos({ left: e.clientX + 5, top: e.clientY + 5 });
                  }}
                >
                  <td>{title}</td>
                  <td>₹{amount}</td>
                </tr>
              );
            })}
          <tr className="flexible-row">
            <th>{items} Items</th>
            <th>₹{total}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
