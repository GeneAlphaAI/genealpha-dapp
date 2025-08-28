// redux/datasetSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { DatasetSchema } from "../../services/DatasetSchema";

const initialDataset = DatasetSchema[0];

const datasetSlice = createSlice({
  name: "dataset",
  initialState: {
    available: DatasetSchema,
    selectedDataset: initialDataset.name, // default to first dataset
    selectedFeatures: initialDataset.selected, // default features
  },
  reducers: {
    setSelectedDataset(state, action) {
      const datasetName = action.payload;
      state.selectedDataset = datasetName;

      // reset features to that dataset’s defaults
      const ds = state.available.find((d) => d.name === datasetName);
      if (ds) {
        state.selectedFeatures = [...ds.selected];
      }
    },
    setSelectedFeatures(state, action) {
      state.selectedFeatures = action.payload;
    },
  },
});

export const { setSelectedDataset, setSelectedFeatures } = datasetSlice.actions;
export default datasetSlice.reducer;
