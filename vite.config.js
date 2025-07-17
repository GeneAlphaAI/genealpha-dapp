import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import EnvironmentPlugin from "vite-plugin-environment";
// https://vite.dev/config/
export default defineConfig({
  plugins: [EnvironmentPlugin("all"), react(), tailwindcss()],
  server: {
    host: true,
    strictPort: true,
    port: 5180,
    allowedHosts: ["genealpha.ai", "hive.genealpha.ai"],
  },
});
