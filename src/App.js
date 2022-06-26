import "./App.css";
import Computer from "./Components/Computer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "./redux/wordList/wordListSlice";

function App() {
  const language = useSelector((state) => state.wordList.language);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList(language));
  }, []);

  return (
    <div className="App">
      <Computer />
    </div>
  );
}

export default App;
