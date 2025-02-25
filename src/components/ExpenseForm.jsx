import React, { useState } from "react";

export default function ExpenseForm({ setExpenses }) {
  const [currExpense, setCurrExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({});
  const validateForm = (formData) => {
    const errorsData = {};
    if (!formData.title) {
      errorsData.title = "Title is required";
    }
    if (!formData.category) {
      errorsData.category = "Category is required";
    }
    if (!formData.amount) {
      errorsData.amount = "Amount is required";
    }
    setErrors(errorsData);
    return errorsData;
  };

  const addExpense = (e) => {
    e.preventDefault();
    console.log(currExpense);
    const validate = validateForm(currExpense);
    if (Object.keys(validate).length) {
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
          className={errors.category ? "error" : ""}
          id="title"
          name="title"
          value={currExpense.title}
          onChange={handleInputChange}
          placeholder={errors.title}
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
          <option value="" disabled hidden>
            {errors.category ? (
              <span style={{ color: "red" }}>{errors.category}</span>
            ) : (
              "Select Category"
            )}
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
          placeholder={errors.amount}
        />
      </div>
      <button className="add-btn">Add</button>
    </form>
  );
}
