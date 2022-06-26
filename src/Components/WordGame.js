import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchList } from "../redux/wordList/wordListSlice";

function Words() {
  const wordList = useSelector((state) => state.wordList.list);
  const dataStatus = useSelector((state) => state.wordList.dataStatus);

  return (
    <div className="screen">
      {dataStatus === "succeeded"
        ? wordList.tr.map((word, index) => {
            return (
              <div className="word-container" key={index}>
                <div
                  className={`word ${index < 2 && "remove"} ${
                    index > 27 && "d-none"
                  }`}
                >
                  {word.word}
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default Words;
