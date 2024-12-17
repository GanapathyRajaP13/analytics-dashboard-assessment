import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import csv from "csvtojson";

const initialState = {
  evData: [],
  loading: false,
  totalCount: 0,
  vehicleYear: [],
  vehicleMake: [],
  message: "",
};

export const fetchEVData = createAsyncThunk(
  "ev/fetchEVData",
  async ({ year, make }) => {
    try {
      const response = await fetch("/Electric_Vehicle_Population_Data.csv");
      const csvText = await response.text();
      const allData = await csv().fromString(csvText);
      const filteredData = allData.filter(
        (item) => item["Model Year"] === year && item.Make === make
      );
      const data = filteredData?.map((item, index) => ({
        ...item,
        id: index + 1,
      }));

      return { data: data };
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return { data: [] };
    }
  }
);

export const fetchVehicleData = createAsyncThunk(
  "ev/fetchVehicleData",
  async () => {
    try {
      const response = await fetch("/Electric_Vehicle_Population_Data.csv");
      const csvText = await response.text();
      const allData = await csv().fromString(csvText);

      const yearData = [...new Set(allData.map((item) => item["Model Year"]))];
      const make = [...new Set(allData.map((item) => item.Make))];

      const dataMake = make
        .map((item, index) => ({
          make: item,
          id: index + 1,
        }))
        .sort((a, b) => a.make.localeCompare(b.make));

      const dataYear = yearData
        .map((item, index) => ({
          year: item,
          id: index + 1,
        }))
        .sort((a, b) => b.year - a.year);

      return {
        dataYear: dataYear,
        dataMake: dataMake,
        totalCount: yearData.length,
      };
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return {
        dataYear: [],
        dataMake: [],
        totalCount: 0,
      };
    }
  }
);

const evSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEVData.pending, (state) => {
        state.loading = true;
        state.message = "";
      })
      .addCase(fetchEVData.fulfilled, (state, action) => {
        if (action.payload.data.length > 0) {
          state.evData = action.payload.data;
          state.message = "";
        } else {
          state.message = "No data available for the selected year and make.";
        }
        state.loading = false;
      })
      .addCase(fetchEVData.rejected, (state) => {
        state.message = "Error fetching data.";
      })
      .addCase(fetchVehicleData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicleData.fulfilled, (state, action) => {
        state.vehicleYear = action.payload.dataYear;
        state.vehicleMake = action.payload.dataMake;
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchVehicleData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetMessage } = evSlice.actions;
export default evSlice.reducer;
