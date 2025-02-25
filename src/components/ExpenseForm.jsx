import React, { useEffect, useRef, useState } from "react";

export default function ExpenseForm({ setExpenses }) {
  // const [currExpense, setCurrExpense] = useState({
  //   title: "",
  //   category: "",
  //   amount: "",
  // });
  // const addExpense = (e) => {
  //   e.preventDefault();
  //   console.log(currExpense);
  //   setExpenses((prevState) => [
  //     ...prevState,
  //     { ...currExpense, id: crypto.randomUUID() },
  //   ]);
  //   setCurrExpense({
  //     id: crypto.randomUUID(),
  //     title: "",
  //     category: "",
  //     amount: "",
  //   });
  // };

  // ------------------useRef() Hook----------------------------------------

  // myRef and myNum both will inc by 1 onClick() button
  // myRef and myNum both will not display updated value onClick() button
  // myRef will exactly behave like normal myNum, then what's the use of useRef() ?
  // when component re-renders due to any other useState() update, then magic happens
  // myNum resets itself to 1, but myRef will remember it's last value which will display
  const myRef = useRef(1);
  console.log("myRef : ", myRef);
  let myNum = 1;
  console.log("myNum : ", myNum);

  // we can also use useRef() to access dom element and change it
  const btnRef = useRef(null);
  useEffect(() => {
    console.log("useEffect() btnRef : ", btnRef);
    btnRef.current.style.backgroundColor = "Blue";
    btnRef.current.innerText = "Clicked!";
  });

  // useRef() can also be used to limit re-rendering of component every time state changes
  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const amountRef = useRef(null);
  const addExpense = (e) => {
    e.preventDefault();
    console.log({
      title: titleRef.current.value,
      category: categoryRef.current.value,
      amount: amountRef.current.value,
    });
    setExpenses((prevState) => [
      ...prevState,
      {
        title: titleRef.current.value,
        category: categoryRef.current.value,
        amount: amountRef.current.value,
        id: crypto.randomUUID(),
      },
    ]);
  };

  return (
    <>
      <div>
        <button
          ref={btnRef}
          onClick={() => {
            myRef.current = myRef.current + 1;
            console.log("myRef : ", myRef);
            myNum = myNum + 1;
            console.log("myNum : ", myNum);
          }}
          type="button"
        >
          Click Me
        </button>
        <h1>{myRef.current}</h1>
        <h1>{myNum}</h1>
      </div>

      <form className="expense-form" onSubmit={addExpense}>
        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            // value={currExpense.title}
            // onChange={(e) =>
            //   setCurrExpense((prevState) => ({
            //     ...prevState,
            //     title: e.target.value,
            //   }))
            // }
            ref={titleRef}
          />
        </div>
        <div className="input-container">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="select-category"
            // value={currExpense.category}
            // onChange={(e) =>
            //   setCurrExpense((prevState) => ({
            //     ...prevState,
            //     category: e.target.value,
            //   }))
            // }
            ref={categoryRef}
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
            // value={currExpense.amount}
            // onChange={(e) =>
            //   setCurrExpense((prevState) => ({
            //     ...prevState,
            //     amount: e.target.value,
            //   }))
            // }
            ref={amountRef}
          />
        </div>
        <button className="add-btn">Add</button>
      </form>
    </>
  );
}
