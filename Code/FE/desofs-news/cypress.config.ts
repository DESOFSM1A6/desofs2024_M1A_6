import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "./cypress/e2e/*",
  },

  e2e: {
    specPattern: "./cypress/e2e/*",
  },
});