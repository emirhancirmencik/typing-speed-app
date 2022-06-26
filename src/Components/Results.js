import React from "react";
import { useSelector } from "react-redux";
function Results() {
  const language = useSelector((state) => state.wordList.language);
  const push = useSelector((state) => state.wordList.push);
  const correctPush = useSelector((state) => state.wordList.correctPush);

  const correctWords = useSelector((state) => state.wordList.correctWords);

  const wrongWords = useSelector((state) => state.wordList.wrongWords);

  return (
    <div className="screen">
      <div className="result">
        <div className="wpm">
          <div className="">
            {Math.round(correctPush / 5)} {language === "tr" ? "DKS" : "WPM"}
          </div>
        </div>
      </div>
      <hr />
      <div className="other-results">
        <div className="result-inner">
          <div className="result-text">
            {language === "tr" ? "Tuş Vuruşu:" : "KeyStrokes:"}
          </div>
          <div className="result-number">
            {"("}
            <span className="correct-result">{correctPush}</span>{" "}
            <span className="wrong-result">{push - correctPush}</span>
            {") "}
            <span></span>
            {push}
          </div>
        </div>
        <div className="result-inner">
          <div className="result-text">
            {language === "tr" ? "Doğru Kelime:" : "Correct Words:"}
          </div>
          <div className="result-number">
            {"("}
            <span className="correct-result">{correctWords}</span>
            {")"}
          </div>
        </div>
        <div className="result-inner">
          <div className="result-text">
            {language === "tr" ? "Yanlış Kelime:" : "Wrong Words:"}
          </div>
          <div className="result-number">
            {"("}
            <span className="wrong-result">{wrongWords}</span>
            {")"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
