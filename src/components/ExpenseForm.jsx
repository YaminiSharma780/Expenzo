import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({ setExpenses }) {
  const [currExpense, setCurrExpense] = useState({
    title: "",
    category: "",
    amount: "",
    email: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setCurrExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 5, message: "Title should be at least 5 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [{ required: true, message: "Please enter an amount" }],
    email: [
      { required: true, message: "Please enter an email" },
      {
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Please enter a valid email",
      },
    ],
  };

  const validateForm = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        console.log(rule);
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 5) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });
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
      <Input
        label={"Title"}
        id={"title"}
        name={"title"}
        value={currExpense.title}
        onChange={handleInputChange}
        error={errors.title}
      />
      <Select
        label={"Category"}
        id={"category"}
        name={"category"}
        value={currExpense.category}
        onChange={handleInputChange}
        error={errors.category}
        defaultOption={"Select Category"}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
      />
      <Input
        label={"Amount"}
        id={"amount"}
        name={"amount"}
        value={currExpense.amount}
        onChange={handleInputChange}
        error={errors.amount}
      />
      <Input
        label={"Email"}
        id={"email"}
        name={"email"}
        value={currExpense.email}
        onChange={handleInputChange}
        error={errors.email}
      />
      <button className="add-btn">Add</button>
    </form>
  );
}
