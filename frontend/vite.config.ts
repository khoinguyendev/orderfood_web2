import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Cấu hình @ trỏ tới thư mục src
    },
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['khoinguyenshop.io.vn'],
  },
  define: {
    global: "window",
  },
});
