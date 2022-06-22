import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTrList = createAsyncThunk("wordList/fetchTrList", async () => {});

export const wordListSlice = createSlice({
  name: "wordList",
  initialState: {
    tr: "asdasd",
  },
  reducers: {},
});

export default wordListSlice.reducer;
