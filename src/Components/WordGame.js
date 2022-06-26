import { useSelector } from "react-redux";

function Words() {
  const wordList = useSelector((state) => state.wordList.list);
  const dataStatus = useSelector((state) => state.wordList.dataStatus);
  const language = useSelector((state) => state.wordList.language);
  const currentIndex = useSelector((state) => state.wordList.currentIndex);

  return (
    <div className="screen">
      {dataStatus === "succeeded"
        ? wordList[language] &&
          wordList[language].map((word, index) => {
            return (
              <div className="word-container" key={index}>
                <div
                  className={`word ${index < 2 && "remove"} ${
                    index > 27 && "d-none"
                  } ${currentIndex === index ? "current" : ""} ${word?.class}`}
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
