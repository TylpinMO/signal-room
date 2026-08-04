import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/signal-room/",
  plugins: [react()],
  build: {
    outDir: "static-dist",
    emptyOutDir: true,
  },
});
