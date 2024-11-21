import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": {
        target: `${process.env.API}`,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
