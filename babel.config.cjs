module.exports = {
  plugins: [
    "babel-plugin-transform-import-meta",
    "@babel/plugin-transform-modules-commonjs", // 👈 Ensures CommonJS compatibility
  ],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
