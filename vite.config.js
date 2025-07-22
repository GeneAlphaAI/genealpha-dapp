import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import EnvironmentPlugin from "vite-plugin-environment";
import obfuscator from "vite-plugin-bundle-obfuscator";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    EnvironmentPlugin("all"),
    react(),
    tailwindcss(),
    obfuscator({
      excludes: ["/node_modules/**"],
      enable: true,
      log: true,
      autoExcludeNodeModules: true,
      // autoExcludeNodeModules: { enable: true, manualChunks: ['vue'] }
      threadPool: true,
      options: {
        // Your javascript-obfuscator options here
        // See what's allowed: https://github.com/javascript-obfuscator/javascript-obfuscator
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        debugProtectionInterval: 0,
        disableConsoleOutput: true,
        identifierNamesGenerator: "hexadecimal",
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.75,
        stringArrayEncoding: ["base64"],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: "function",
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
      },
    }),
  ],
  build: {
    sourcemap: false,
    sourcemapExcludeSources: true,
    rollupOptions: {
      output: {
        sourcemap: false,
      },
      plugins: [],
    },
  },
  server: {
    host: true,
    strictPort: true,
    port: 5180,
    allowedHosts: ["genealpha.ai", "hive.genealpha.ai"],
  },
});
