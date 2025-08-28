import { createSlice } from "@reduxjs/toolkit";
import { ModelSchema } from "../../services/ModelSchema";

const initialState = {
  selectedModel: ModelSchema[0].model,
  models: ModelSchema.map((m) => m.model),
  parameters: ModelSchema.reduce((acc, model) => {
    acc[model.model] = model.parameters.reduce((p, param) => {
      // If multiple-select → always ensure array
      if (param.type === "select" && param.selectType === "multiple") {
        p[param.name] = Array.isArray(param.default)
          ? param.default
          : [param.default];
      } else {
        p[param.name] = param.default;
      }
      return p;
    }, {});
    return acc;
  }, {}),
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    selectModel(state, action) {
      state.selectedModel = action.payload;
    },
    updateParameter(state, action) {
      const { model, paramName, value } = action.payload;
      state.parameters[model][paramName] = value;
    },
    resetModelParams(state, action) {
      const model = action.payload;
      const schema = ModelSchema.find((m) => m.model === model);
      if (schema) {
        state.parameters[model] = schema.parameters.reduce((p, param) => {
          p[param.name] = param.default;
          return p;
        }, {});
      }
    },
    resetParameter(state, action) {
      const { model, paramName } = action.payload;
      const schema = ModelSchema.find((m) => m.model === model);
      if (schema) {
        const paramSchema = schema.parameters.find((p) => p.name === paramName);
        if (paramSchema) {
          state.parameters[model][paramName] = paramSchema.default;
        }
      }
    },
  },
});

export const {
  selectModel,
  updateParameter,
  resetModelParams,
  resetParameter,
} = modelSlice.actions;
export default modelSlice.reducer;
