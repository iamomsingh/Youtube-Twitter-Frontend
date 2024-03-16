import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";
// import { createProxy } from "vite-plugin-mock";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "production"
            ? "https://backend-with-fun.onrender.com"
            : "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        // ws: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});

//https://backend-with-fun.onrender.com
//"http://localhost:5000"
