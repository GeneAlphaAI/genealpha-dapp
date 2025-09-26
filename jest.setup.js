import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

// Suppress React Router Future Flag Warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  const warningMessage = args[0];

  if (
    typeof warningMessage === "string" &&
    (warningMessage.includes(
      "⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates"
    ) ||
      warningMessage.includes(
        "⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing"
      ))
  ) {
    return;
  }

  originalWarn(...args);
};

// Mock `import.meta.env` for Vite environment variables
Object.defineProperty(global, "import.meta", {
  value: {
    env: {
      VITE_ENCRYPTION_SECRET_KEY: "test-secret-key",
      VITE_ENCRYPTION_SALT: "test-salt",
    },
  },
});
