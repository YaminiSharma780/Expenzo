import React, { useState } from "react";

export default function ExpenseForm({ setExpenses }) {
  // // 1st way to extract data from Form without using useState
  // const addExpense = (e) => {
  //   e.preventDefault();
  //   const newExpense = { ...getFormData(e.target), id: crypto.randomUUID() };
  //   setExpenses((prevState) => [...prevState, newExpense]);
  //   e.target.reset();
  // };
  // const getFormData = (form) => {
  //   const formData = new FormData(form);
  //   const data = {};
  //   for (const [key, value] of formData.entries()) {
  //     data[key] = value;
  //   }
  //   return data;
  // };

  // // 2nd way to extract data from Form using multiple useStates
  // const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  // const [amount, setAmount] = useState("");
  // const addExpense = (e) => {
  //   e.preventDefault();
  //   const expense = { title, category, amount, id: crypto.randomUUID() };
  //   setExpenses((prevState) => [...prevState, expense]);
  //   // won't work for clearing inputs
  //   // e.target.reset();
  //   // works fine for clearing inputs
  //   setTitle("");
  //   setCategory("");
  //   setAmount("");
  // };

  // // 3rd way to extract data from Form using single useState
  const [currExpense, setCurrExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });
  const addExpense = (e) => {
    e.preventDefault();
    console.log(currExpense);
    setExpenses((prevState) => [
      ...prevState,
      { ...currExpense, id: crypto.randomUUID() },
    ]);
    setCurrExpense({
      id: crypto.randomUUID(),
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
          onChange={(e) =>
            setCurrExpense((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />
      </div>
      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="select-category"
          value={currExpense.category}
          onChange={(e) =>
            setCurrExpense((prevState) => ({
              ...prevState,
              category: e.target.value,
            }))
          }
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
          onChange={(e) =>
            setCurrExpense((prevState) => ({
              ...prevState,
              amount: e.target.value,
            }))
          }
        />
      </div>
      <button className="add-btn">Add</button>
    </form>
  );
}
