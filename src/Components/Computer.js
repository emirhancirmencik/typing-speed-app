import React from "react";
import WordGame from "./WordGame";

function Computer() {
  return (
    <div className="computer">
      <div className="computer-header"></div>
      <div className="computer-screen">
        <WordGame />
      </div>
      <div className="computer-controls"></div>
      <input type="text" className="text-input" />
      <input type="button" className="reset-button" />
      <input type="button" className="language-button" />
    </div>
  );
}

export default Computer;
