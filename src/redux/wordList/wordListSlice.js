import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchList = createAsyncThunk(
  "wordList/getList",
  async (language) => {
    const res = await axios(`./JSON/${language}WordList.JSON`);
    return res.data.sort(() => Math.random() - 0.5).splice(0, 300);
  }
);

export const wordListSlice = createSlice({
  name: "wordList",
  initialState: {
    list: { tr: "", en: "" },
    language: "tr" || "en",
    dataStatus: "idle",
    error: "",
    currentIndex: 0,
    correctWords: 0,
    wrongWords: 0,
    push: 0,
    correctPush: 0,
  },
  reducers: {
    setWordClass: (state, action) => {
      let userWord = action.payload.after;
      const language = state.language;
      state.push += 1;
      if (userWord[userWord.length - 1] === " ") {
        userWord = userWord.trim();
        if (state.list[language].length >= 26 && state.currentIndex <= 27) {
          const word = state.list[language][state.currentIndex].word;
          if (word.toLowerCase() === userWord.toLowerCase()) {
            state.list[language][state.currentIndex].class = "correct";
            state.correctWords += 1;
          } else {
            state.list[language][state.currentIndex].class = "wrong";
            state.wrongWords += 1;
          }

          if (state.currentIndex % 27 === 0 && state.currentIndex !== 0) {
            state.list[language].splice(0, 7);
            state.currentIndex -= 7;
          }

          state.currentIndex += 1;
        }
      } else {
        if (state.list[language].length >= 26 && state.currentIndex <= 27) {
          const word = state.list[language][state.currentIndex].word;
          let length = userWord.length;
          if (word.toLowerCase().slice(0, length) === userWord.toLowerCase()) {
            state.list[language][state.currentIndex].class = "correct";
            let before = action.payload.before;
            if (before.length < userWord.length) {
              state.correctPush += 1;
            } else {
              state.correctPush -= 1;
            }
          } else {
            state.list[language][state.currentIndex].class = "wrong";
          }
        }
      }
    },
    resetGame: (state) => {
      state.currentIndex = 0;
      state.correctWords = 0;
      state.correctPush = 0;
      state.push = 0;
      state.wrongWords = 0;
    },
    changeLanguage: (state) => {
      if (state.language === "tr") {
        state.language = "en";
      } else {
        state.language = "tr";
      }
    },
  },
  extraReducers: {
    [fetchList.fulfilled]: (state, action) => {
      state.list[state.language] = action.payload;
      state.dataStatus = "succeeded";
    },
    [fetchList.pending]: (state) => {
      state.dataStatus = "pending";
    },
    [fetchList.rejected]: (state, action) => {
      state.dataStatus = "error";
      state.error = action.error.message;
    },
  },
});

export const { setWordClass, setCurrentIndex, resetGame, changeLanguage } =
  wordListSlice.actions;
export default wordListSlice.reducer;
