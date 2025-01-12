import { configureStore } from "@reduxjs/toolkit";
import disasterReducer from "./disasterSlice";

const store = configureStore({
  reducer: {
    disasters: disasterReducer,
  },
});

export default store;
