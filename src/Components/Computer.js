/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import WordGame from "./WordGame";
import Input from "./Input";
import { useCountdownTimer } from "use-countdown-timer";
import Results from "./Results";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchList,
  resetGame,
  changeLanguage,
} from "../redux/wordList/wordListSlice";

function Computer() {
  const [showGame, setShowGame] = useState(1);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.wordList.language);
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * 60,
  });

  function handleReset() {
    reset();
    dispatch(fetchList(language));
    dispatch(resetGame());
  }

  useEffect(() => {
    if (countdown === 0) {
      setShowGame(0);
      pause();
    } else {
      setShowGame(1);
    }
  }, [countdown]);

  return (
    <div
      className="computer"
      title={
        isRunning
          ? (language === "tr" ? "KALAN ZAMAN: " : `TIME LEFT: `) +
            (countdown > 9000
              ? String(countdown).slice(0, 2)
              : String(countdown).slice(0, 1))
          : `ARCADE MACHINE`
      }
    >
      <div className="computer-header"></div>
      <div className="computer-screen">
        {showGame ? <WordGame /> : <Results />}
      </div>
      <div className="computer-controls"></div>
      <Input start={start} showGame={showGame} />
      <input
        type="button"
        className="reset-button"
        value="reset"
        onClick={() => handleReset()}
      />

      <input
        type="button"
        className="language-button"
        value={language === "tr" ? "en" : "tr"}
        onClick={() => dispatch(changeLanguage())}
      />
    </div>
  );
}

export default Computer;
