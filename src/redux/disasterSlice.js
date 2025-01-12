import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchDisasters = createAsyncThunk("disasters/fetchDisasters", async () => {
  const response = await axios.get("http://localhost/disaster/getDisasters.php");
  return response.data;
});

export const createDisaster = createAsyncThunk("disasters/createDisaster", async (data) => {
  await axios.post("http://localhost/disaster/createDisaster.php", data);
  return data;
});

export const updateDisaster = createAsyncThunk("disasters/updateDisaster", async ({ id, ...data }) => {
  await axios.post("http://localhost/disaster/updateDisaster.php", { id, ...data });
  return { id, ...data };
});

export const deleteDisaster = createAsyncThunk("disasters/deleteDisaster", async (id) => {
  await axios.post("http://localhost/disaster/deleteDisaster.php", { id });
  return id;
});

// Slice
const disasterSlice = createSlice({
  name: "disasters",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Disasters
      .addCase(fetchDisasters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDisasters.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDisasters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Disaster
      .addCase(createDisaster.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Update Disaster
      .addCase(updateDisaster.fulfilled, (state, action) => {
        const index = state.list.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      // Delete Disaster
      .addCase(deleteDisaster.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      });
  },
});

export default disasterSlice.reducer;
