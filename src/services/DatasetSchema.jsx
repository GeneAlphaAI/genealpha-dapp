export const DatasetSchema = [
  {
    name: "Iris",
    features: ["sepal_length", "sepal_width", "petal_length", "petal_width"],
    // Which features are selected by default
    selected: ["sepal_length", "sepal_width"],
    // Which features cannot be deselected
    required: ["sepal_length"],
  },
  {
    name: "MNIST",
    features: ["pixel_values", "labels"],
    selected: ["pixel_values", "labels"],
    required: ["labels"],
  },
  {
    name: "Titanic",
    features: ["age", "sex", "fare", "class", "survived"],
    selected: ["sex", "fare", "survived"],
    required: ["survived"],
  },
];
