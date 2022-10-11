// vite.config.ts
const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/content-editor.ts"),
      name: "StupidContentEditor",
      fileName: (format) => `stupid-content-editor.js`,
    },
   
  },
});
