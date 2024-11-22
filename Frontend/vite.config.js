import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `${import.meta.env.VITE_API}`, // Use environment variable with VITE_ prefix
        rewrite: (path) => {
          return path.replace(/^\/api/, "");
        },
        changeOrigin: true,
        secure: false, // Ensure this is necessary for your use case
      },
      build: {
        outDir: "dist",
      },
    },
  },
});
