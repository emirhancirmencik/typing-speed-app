import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWordClass } from "../redux/wordList/wordListSlice";

function Input({ start, showGame }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.wordList.currentIndex);
  const language = useSelector((state) => state.wordList.language);

  function handleChange(e) {
    if (!showGame) {
      setInput("");
      return;
    }
    if (currentIndex === 0) {
      start();
    }

    if (e[e.length - 1] === " ") {
      if (e.trim().length !== 0) {
        dispatch(setWordClass({ before: input, after: e }));
        setInput("");
      } else {
        setInput("");
        return;
      }
    } else {
      dispatch(setWordClass({ before: input, after: e }));
    }
    setInput(e);
    if (e[e.length - 1] === " ") {
      setInput("");
    }
  }
  return (
    <input
      type="text"
      placeholder={
        currentIndex === 0
          ? `${language === "tr" ? "Buraya Yaz" : "Type Here"}`
          : ""
      }
      value={input}
      onChange={(e) => handleChange(e.target.value)}
      className="text-input"
    />
  );
}

export default Input;
