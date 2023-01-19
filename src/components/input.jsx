import React, { useContext, useState } from "react";
import { DataContext } from "../DataContext";

function Input() {
  const { attempt, newAttempt, title, reloadImgs, points, setPoints } =
    useContext(DataContext);
  const [answer, setAnswer] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  const handleClick = () => {
    console.log(title); //delete
    if (answer.toLowerCase() === title.toLowerCase()) {
      reloadImgs();
      setPoints((prev) => prev + 5);
    } else {
      newAttempt();
      setPoints((prev) => prev - 1);
    }
  };
  const giveUp = () => {
    setShowTitle(true);
    setTimeout(() => {
      setShowTitle(false);
      reloadImgs();
      setPoints((prev) => prev - 5);
    }, 2500);
  };
  return (
    <div className="input">
      <div className="flex">
        <div className="points">Your score : {points}</div>
        <div className="attempt">Attempt : {attempt}</div>
      </div>
      {showTitle ? (
        <div className="title">
          Title is <span> {title}</span>
        </div>
      ) : (
        <div className="input-form">
          <input type="text" onChange={handleChange} value={answer} />
          <button onClick={handleClick}>confirm</button>
          <button onClick={giveUp} className="give-up">
            give up
          </button>
        </div>
      )}
    </div>
  );
}

export default Input;
