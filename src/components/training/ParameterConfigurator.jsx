import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetParameter, updateParameter } from "../../store/slices/model";
import { ModelSchema } from "../../services/ModelSchema";
import SectionLabel from "../influencer/SectionLabel";
import RangeSlider from "../form/RangeSlider";
import CommonSelector from "../form/CommonSelector";

const ParameterConfigurator = ({ isAdvanced = false }) => {
  const dispatch = useDispatch();
  const { selectedModel, parameters } = useSelector((state) => state.model);

  if (!selectedModel) return null;

  const schema = ModelSchema.find((m) => m.model === selectedModel);
  if (!schema) return null;

  const paramValues = parameters[selectedModel];

  // 🔎 Filter based on advanced flag
  const filteredParams = schema.parameters.filter(
    (param) => param.advanced === isAdvanced
  );

  return (
    <div className="flex flex-col gap-6">
      {filteredParams.map((param) => {
        const value = paramValues[param.name];

        // Case 1: Number → RangeSlider
        if (param.type === "number") {
          return (
            <RangeSlider
              key={param.name}
              label={param.label || param.name}
              description={param.description}
              min={param.min}
              max={param.max}
              step={param.step || 1}
              value={value}
              defaultValue={param.default}
              onChange={(val) =>
                dispatch(
                  updateParameter({
                    model: selectedModel,
                    paramName: param.name,
                    value: val,
                  })
                )
              }
              onReset={() =>
                dispatch(
                  resetParameter({
                    model: selectedModel,
                    paramName: param.name,
                  })
                )
              }
            />
          );
        }

        // Case 2: Select (categorical) → CommonSelector
        if (param.type === "select") {
          const isMultiple = param.selectType === "multiple";
          return (
            <CommonSelector
              key={param.name}
              label={param.label || param.name}
              description={param.description}
              options={param.options}
              defaultValue={param.default}
              multiple={isMultiple}
              selected={Array.isArray(value) ? value : [value]}
              onChange={(val) =>
                dispatch(
                  updateParameter({
                    model: selectedModel,
                    paramName: param.name,
                    value: isMultiple ? val : val[0], // ✅ works for both single and multiple
                  })
                )
              }
            />
          );
        }

        // Case 3: Boolean → CommonSelector (True/False)
        if (param.type === "boolean") {
          return (
            <CommonSelector
              key={param.name}
              label={param.label || param.name}
              description={param.description}
              options={[
                { label: "True", value: true },
                { label: "False", value: false },
              ]}
              defaultValue={param.default}
              multiple={false}
              selected={[value]}
              onChange={(val) =>
                dispatch(
                  updateParameter({
                    model: selectedModel,
                    paramName: param.name,
                    value: val[0] === true || val[0] === "true",
                  })
                )
              }
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default ParameterConfigurator;
