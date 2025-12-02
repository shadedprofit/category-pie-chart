import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**"],
    },
    clearMocks: true,
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/vitest.setup.ts"],
    css: true,
    retry: 2,
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
});
