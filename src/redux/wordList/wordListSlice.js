import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchList = createAsyncThunk(
  "wordList/getList",
  async (language) => {
    const res = await axios(`./JSON/${language}WordList.JSON`);
    return res.data.sort(() => Math.random() - 0.5);
  }
);

export const wordListSlice = createSlice({
  name: "wordList",
  initialState: {
    list: { tr: "aasdasd", en: "asdsadsa" },
    language: "tr" || "en",
    dataStatus: "idle",
    error: "",
  },
  reducers: {
    consoleLog: (state) => {
      console.log(state.list.tr);
    },
  },
  extraReducers: {
    [fetchList.fulfilled]: (state, action) => {
      state.list[state.language] = action.payload;
      console.log(state.list[state.language]);
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

export const { consoleLog } = wordListSlice.actions;
export default wordListSlice.reducer;
