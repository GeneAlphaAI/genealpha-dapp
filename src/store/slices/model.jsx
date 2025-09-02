import { createSlice } from "@reduxjs/toolkit";
import { ModelSchema } from "../../services/ModelSchema";

const initialState = {
  // default to first model's value
  selectedModel: ModelSchema[0].model.value,
  // store list of { label, value }
  models: ModelSchema.map((m) => m.model),
  // parameters keyed by model.value
  parameters: ModelSchema.reduce((acc, m) => {
    acc[m.model.value] = m.parameters.reduce((p, param) => {
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
      state.selectedModel = action.payload; // should be model.value
    },
    updateParameter(state, action) {
      const { model, paramName, value } = action.payload; // model = model.value
      state.parameters[model][paramName] = value;
    },
    resetModelParams(state, action) {
      const modelValue = action.payload;
      const schema = ModelSchema.find((m) => m.model.value === modelValue);
      if (schema) {
        state.parameters[modelValue] = schema.parameters.reduce((p, param) => {
          p[param.name] = param.default;
          return p;
        }, {});
      }
    },
    resetParameter(state, action) {
      const { model, paramName } = action.payload; // model = model.value
      const schema = ModelSchema.find((m) => m.model.value === model);
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
