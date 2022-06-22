import { configureStore } from "@reduxjs/toolkit";
import wordListReducer from "./wordList/wordListSlice";

export default configureStore({
  reducer: {
    wordList: wordListReducer,
  },
});
