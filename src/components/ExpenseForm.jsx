import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  setExpenses,
  currExpense,
  setCurrExpense,
  editingRowID,
  setEditingRowID,
}) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setErrors({});
    let { name, value } = e.target;
    if (name == "amount") {
      if (!isNaN(value)) {
        value = Number(value);
      } else {
        value = 0;
      }
    }
    setCurrExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 3, message: "Title should be at least 3 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      { pattern: /^\d+$/, message: "Please enter correct amount" },
    ],
  };

  const validateForm = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 3) {
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
    const validate = validateForm(currExpense);
    if (Object.keys(validate).length) {
      return;
    }

    if (editingRowID) {
      setExpenses((prevState) =>
        prevState.map((exp) => {
          if (exp.id === editingRowID) {
            return { ...currExpense, id: editingRowID };
          }
          return exp;
        })
      );
      setEditingRowID("");
      setCurrExpense({
        title: "",
        category: "",
        amount: "",
      });
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      {
        ...currExpense,
        id: crypto.randomUUID(),
      },
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
      <button className="add-btn">{editingRowID == "" ? "Add" : "Save"}</button>
    </form>
  );
}
