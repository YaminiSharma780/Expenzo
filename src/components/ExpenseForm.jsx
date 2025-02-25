import React, { useState } from "react";

export default function ExpenseForm({ setExpenses }) {
  const [currExpense, setCurrExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const { id, value } = e.target;
    setCurrExpense((prevState) => ({
      ...prevState,
      [name]: value,
      // [id]: value,
    }));
  };

  const addExpense = (e) => {
    e.preventDefault();
    console.log(currExpense);
    if (!currExpense.title || !currExpense.category || !currExpense.amount) {
      console.log("empty tuple");
      return;
    }
    setExpenses((prevState) => [
      ...prevState,
      { ...currExpense, id: crypto.randomUUID() },
    ]);
    setCurrExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  return (
    <form className="expense-form" onSubmit={addExpense}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={currExpense.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="select-category"
          value={currExpense.category}
          onChange={handleInputChange}
        >
          <option value="" hidden>
            Select Category
          </option>
          <option value="Grocery">Grocery</option>
          <option value="Clothes">Clothes</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="Medicine">Medicine</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          value={currExpense.amount}
          onChange={handleInputChange}
        />
      </div>
      <button className="add-btn">Add</button>
    </form>
  );
}
