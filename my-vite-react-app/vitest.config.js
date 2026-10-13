import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        titleProp: true,
      },
      include: "**/*.svg", // Укажите пути к SVG-файлам, если нужно
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5015", // Your backend server URL
        changeOrigin: true, // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes '/api' from the forwarded request path
      },
    },
  },
});
